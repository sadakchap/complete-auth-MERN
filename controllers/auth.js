const User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { validationResult } = require('express-validator');
const _ = require('lodash');
const { sendMail } = require('../helpers/sendMail');
const axios = require('axios');
const {OAuth2Client} = require('google-auth-library');
const { response } = require('express');
const user = require('../models/user');

exports.signup = (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            error: errors.array()[0]["msg"]
        });
    }

    const { name, email, password } = req.body;
    User.findOne({ email }).exec((err, user) => {
        if(err){
            return res.status(400).json({
                error: 'Sorry, Something went wrong'
            });
        }
        if(user){
            return res.status(400).json({
                error: 'Sorry, email already taken!'
            })
        }
        
        const token = jwt.sign({ name, email, password }, process.env.JWT_VERIFY_EMAIL_SECRET, { expiresIn: '15m' })
        
        const verifyLink = `${process.env.CLIENT_URL}/user/verify/${token}`;
        const html = `
                <p>Hi ${name}, </p>
                <p>Kindly follow the instructions to verify your email</p>
                <p>Just click on the link below and verify your email address</p>
                <a href="${verifyLink}" target="_blank">Verify Email</a>
            `;

        sendMail(email, 'MERN-AUTH Email Verification', html)
            .then(result => {
                console.log(result);
                return res.status(201).json({
                    message: 'Please, verify your email address'
                });
            })
            .catch(err => {
                console.log(err);;
                return res.status(400).json({
                    error: 'Couldnt send email'
                });
            })
    })
};

exports.signin = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            error: errors.array()[0]["msg"]
        });
    }

    const { email, password } = req.body;
    User.findOne({ email }).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: 'Email not registered yet!'
            });
        }
        if(user.authenticate(password)){
            const token = jwt.sign({ user: user._id }, process.env.JWT_AUTH_SECRET, { expiresIn: '7d' });
            const { _id, name, email, role } = user;
            return res.status(200).json({
                token,
                user: { _id, name, email, role }
            })
        }else{
            return res.status(400).json({
                error: 'Email and password do not match!'
            });
        }
    });
};

exports.signout = (req, res) => {

};

exports.userEmailVerify = (req, res) => {
    const { token } = req.body;
    if(token){
        try {
            const { name, email, password } = jwt.verify(token, process.env.JWT_VERIFY_EMAIL_SECRET);
            const newUser = new User({ name, email, password });
            User.findOne({ email }).exec((err, user) => {
                if(user){
                    return res.status(400).json({
                        error: 'Sorry, email already taken!'
                    });
                }
                newUser.save((err, saved) => {
                    if(err){
                        return res.status(400).json({
                            error: 'Sorry, something went wrong'
                        });
                    }
                    return res.status(200).json({
                        message: 'Please, Log into your account'
                    });
                })
            })
        } catch (err) {
            return res.status(400).json({
                error: 'Invalid token or Expired Token, please Signup again!'
            })
        }
    }else{
        return res.status(400).json({
            error: 'Missing email verify token'
        })
    }
};

exports.sendForgotPassowrdLink = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            error: errors.array()[0]["msg"]
        });
    }
    const { email } = req.body;
    User.findOne({ email }).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: 'Email not registered yet!'
            });
        }
        const token = jwt.sign({ user: user._id }, process.env.JWT_RESET_PASSWORD_SECRET, { expiresIn: '20m' });

        return user.updateOne({
            resetPasswordLink: token
        },  (err, oldUser) => {
            if(err){
                return res.status(400).json({
                    error: 'Something went wrong'
                });
            }
            const resetLink = `${process.env.CLIENT_URL}/user/password/reset/${token}`;
            const subject = 'MERN-AUTH Password Reset Link';
            const html = `
                    <p>Hi ${user.name}, </p>
                    <p>Just click on the link below and reset your password</p>
                    <a href="${resetLink}" target="_blank">Reset Password</a>
                    <p>If you didn't generated this link, no action need to be taken.</p>
                    <hr/>
                    <p>This email contains sensitive information, please do not share it with anyone</p>
                    <p>${process.env.CLIENT_URL}</p>
                `;
            
            sendMail(email, subject, html)
                .then(result => {
                    return res.status(200).json({
                        message: 'Please, check your registered email for further instructions'
                    })
                })
                .catch(err => {
                    console.log(err);
                    return res.status(400).json({
                        error: 'Couldn\'t send email'
                    });
                })
        })
    })

};

exports.userResetPassword = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            error: errors.array()[0]["msg"]
        });
    }
    const { token, newPassword } = req.body;
    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_RESET_PASSWORD_SECRET);
            User.findById(decoded.user).exec((err, user) => {
                if(err || !user){
                    return res.status(400).json({
                        error: 'Hmm, looks like user doesn\'t exists '
                    });
                }

                if(user.resetPasswordLink !== token){
                    return res.status(400).json({
                        error: 'Sorry, Reset link has been already used!'
                    })
                }

                const updatedFields = {
                    resetPasswordLink: '',
                    password: newPassword
                }

                user = _.extend(user, updatedFields);
                user.save((err, saved) => {
                    if(err){
                        return res.status(400).json({
                            error: 'Sorry, something went wrong'
                        });
                    }
                    return res.status(201).json({
                        message: 'Password updated successfully!'
                    })
                })

            })
        } catch (err) {
            return res.status(400).json({
                error: 'Invalid or Expired token!'
            })
        }
    }else{
        return res.status(400).json({
            error: 'Missing reset password token'
        })
    }
};

exports.isSignedIn = expressJwt({ secret: process.env.JWT_AUTH_SECRET, algorithms: ['HS256'], userProperty: 'auth' });

exports.isAuthenticated = (req, res, next) => {

};

exports.isAdmin = (req, res, next) => {

};

exports.facebookLoginController = (req, res) => {
    const { userID, accessToken } = req.body;
    const url = `https://graph.facebook.com/${userID}?fields=id,name,email&access_token=${accessToken}`;
    return axios.get(url)
        .then(response =>{
            const { email, name } = response.data;
            User.findOne({ email }).exec((err, user) => {
                if(user){
                    const token = jwt.sign({ user: user._id}, process.env.JWT_AUTH_SECRET, { expiresIn: '7d' });
                    const { _id, name, email, role } = user;
                    return res.status(200).json({
                        token,
                        user: { _id, name, email, role}
                    })
                }else{
                    const password = email + process.env.JWT_AUTH_SECRET;
                    const newUser = new User({ name, email, password });
                    newUser.save((err, saved) => {
                        if(err){
                            return res.status(400).json({
                                error: 'Facebook login failed!'
                            });
                        }
                        const token = jwt.sign({ user: saved._id}, process.env.JWT_AUTH_SECRET, { expiresIn: '7d' });
                        const { _id, name, email, role } = saved;
                        return res.status(200).json({
                            token,
                            user: { _id, name, email, role}
                        });
                    });
                }
            })
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json({
                error: 'Facebook Login Failed!'
            })
        })
};

const client = new OAuth2Client(process.env.GOOGLE_AUTH_CLIENT_ID);

exports.googleLoginController = (req, res) => {
    const { idToken } = req.body;
    client.verifyIdToken({ idToken, audience: process.env.GOOGLE_AUTH_CLIENT_ID })
        .then(response => {
            const { email, name, email_verified } = response.payload;
            if(email_verified){
                User.findOne({ email }).exec((err, user) => {
                    if(user){
                        const token = jwt.sign({ user: user._id }, process.env.JWT_AUTH_SECRET, { expiresIn: '7d' });
                        const { _id, email, name, role } = user;
                        return res.status(200).json({
                            token,
                            user: { _id, name, email, role }
                        });
                    }else{
                        const password = email + process.env.JWT_AUTH_SECRET;
                        const newUser = new User({ name, email, password });
                        newUser.save((err, data) => {
                            if(err){
                                console.log(err);
                                return res.status(400).json({
                                    error: 'Google login failed!'
                                });
                            }
                            const token = jwt.sign({ user: data._id }, process.env.JWT_AUTH_SECRET, { expiresIn: '7d' });
                            const { _id, email, name, role } = data;
                            return res.status(200).json({
                                token,
                                user: { _id, name, email, role }
                            });
                        });
                    }
                })
            }

        })
        .catch(err => {
            console.log(err);
            return res.status(400).json({
                error: 'Google Login Failed!'
            })
        })

}