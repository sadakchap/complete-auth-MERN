import React, { useState } from 'react';
import axios from 'axios';
import { Authenticate, isAuth } from '../helpers/auth';
import { Link, useHistory } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin } from 'react-google-login';

const Signin = ({ showToast }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleChange = name => e => setFormData({ ...formData, [name]: e.target.value });

    const informParent = (response) => {
        Authenticate(response, () => {
            isAuth() && isAuth().role === 1 ? history.push('/admin/dashboard') : history.push('/user/dashboard');
        });
    }

    const handleSubmit = e => {
        console.log('comming here');
        e.preventDefault();
        if(!email || !password){
            return showToast('All fields are required!', 'error');
        }
        setLoading(true);
        axios.post(`${process.env.REACT_APP_API_URL}/signin`, { email, password })
            .then(res => {
                if(res.data.error)  return showToast(res.data.error, 'error');
                Authenticate(res, () => {
                    setFormData({
                        email: '',
                        password: ''
                    });
                    showToast('Sign in successfull!', 'success');
                    setTimeout(() => {
                        isAuth() && isAuth().role === 1 ? history.push('/admin/dashboard') : history.push('/user/dashboard');
                    }, 3000);
                })
            })
            .catch(err => {
                if(err?.response?.data.error) return showToast(err.response.data.error, 'error');
                return showToast('Sorry, something went wrong!', 'error');
            });
        setLoading(false);
    }

    const sendFacebookResponse = (userID, accessToken) => {
        axios.post(`${process.env.REACT_APP_API_URL}/facebooklogin`, { userID, accessToken })
            .then(res => {
                console.log(res.data);
                showToast('You are logged In with facebook profile', 'success');
                setTimeout(() => {
                    informParent(res);
                }, 3000);
            })
            .catch(err => {
                if(err.response.data.error) return showToast(err.response.data.error, 'error');
                return showToast('Sorry, Something went Wrong!', 'error');
            })
    }

    const responseFacebook = response => {
        console.log(response);
        sendFacebookResponse(response.userID, response.accessToken);
    }

    const sendGoogleToken = tokenId => {
        axios.post(`${process.env.REACT_APP_API_URL}/googlelogin`, { idToken: tokenId })
            .then(res => {
                console.log(res.data);
                showToast('You are logged In with Google profile', 'success');
                setTimeout(() => {
                    informParent(res);
                }, 2000);
            })
            .catch(err => {
                console.log(err);
                if(err.response.data.error) return showToast(err.response.data.error, 'error');
                return showToast('Sorry, something went wrong!', 'error');
            })
    }

    const responseGoogle = response => {
        console.log(response);
        sendGoogleToken(response.tokenId)
    }

    const { email, password } = formData;
    return (
        <>
            <form className="sign-in-form" onSubmit={handleSubmit}>
                <h2 className="title">Sign In</h2>
                <div className="input-field">
                    <i className="fa fa-envelope"></i>
                    <input type="email" placeholder="Email" onChange={handleChange("email")} value={email} />
                </div>
                <div className="input-field">
                    <i className="fa fa-lock"></i>
                    <input type="password" placeholder="Password" onChange={handleChange("password")} value={password} />
                </div>
                <Link className="forget-link" to="/user/password/forgot">Forgot Password ?</Link>
                <button type="submit" className="btn solid" disabled={loading}>Log in</button>
                <p className="social-text">Or Sign In with social platforms</p>
                    <div className="social-media">
                        <FacebookLogin
                            appId={`${process.env.REACT_APP_FACEBOOK_CLIENT_ID}`}
                            autoLoad={false}
                            fields="name,email,picture"
                            callback={responseFacebook}
                            render={ renderProps => (
                                <a href="#!"  onClick={renderProps.onClick} disabled={renderProps.disabled} className="social-icons">
                                    <i className="fa fa-facebook"></i>
                                </a>
                            )}
                        ></FacebookLogin>
                        <GoogleLogin 
                            clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            render={renderProps => (
                                <a href="#!"  onClick={renderProps.onClick} disabled={renderProps.disabled} className="social-icons">
                                    <i className="fa fa-google"></i>
                                </a>
                            )}
                        />
                    </div>
            </form>
        </>
    )
}

export default Signin
