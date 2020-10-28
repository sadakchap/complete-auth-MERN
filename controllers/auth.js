const User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');

console.log(`${process.env.EMAIL_FROM}`);
console.log(`${process.env.EMAIL_PASSWORD}`);

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.EMAIL_FROM}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
});

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
        transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'MERN-AUTH Email Verification',
            html: `
                <p>Hi ${name}, </p>
                <p>Kindly follow the instructions to verify your email</p>
                <p>Just click on the link below and verify your email address</p>
                <a href="${verifyLink}" target="_blank">Verify Email</a>
            `,
        }, (err, info) => {
            console.log(err);
            if(err){
                return res.status(400).json({
                    error: 'Couldnt send email'
                });
            }
            return res.status(201).json({
                message: 'Please, verify your email address'
            });
        });
    })
};

exports.signin = (req, res) => {

};

exports.signout = (req, res) => {

};

exports.userEmailVerify = (req, res) => {
    const { token } = req.body;
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
};

exports.sendForgotLink = (req, res) => {

};

exports.userResetPassword = (req, res) => {

};