import React, { useState } from 'react';
import axios from 'axios';

const Signin = ({ showToast }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = name => e => setFormData({ ...formData, [name]: e.target.value });

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
                setFormData({
                    email: '',
                    password: ''
                });
                console.log(res.data);
                return showToast('you are log in', 'success');
            })
            .catch(err => {
                if(err.response.data.error) return showToast(err.response.data.error, 'error');
                return showToast('Sorry, something went wrong!', 'error');
            });
        setLoading(false);
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
                <button type="submit" className="btn solid" disabled={loading}>Log in</button>
                <p className="social-text">Or sign up with social platforms</p>
                    <div className="social-media">
                        <a href="#!" className="social-icons">
                            <i className="fa fa-facebook"></i>
                        </a>
                        <a href="#!" className="social-icons">
                            <i className="fa fa-twitter"></i>
                        </a>
                        <a href="#!" className="social-icons">
                            <i className="fa fa-github"></i>
                        </a>
                        <a href="#!" className="social-icons">
                            <i className="fa fa-google"></i>
                        </a>
                    </div>
            </form>
        </>
    )
}

export default Signin
