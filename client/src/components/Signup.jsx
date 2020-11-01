import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ showToast, changeMode }) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = name => e => setFormData({ ...formData, [name]: e.target.value });

    const { name, email, password, passwordConfirm } = formData;

    const onSubmit = e => {
        e.preventDefault();
        if(!name || !password || !email){
            return showToast('All fields are required', 'error');
        }
        if(!password || password !== passwordConfirm){
            return showToast('Passwords must match!', 'error');
        }

        setLoading(true);
        axios.post(`${process.env.REACT_APP_API_URL}/signup`, { name, email, password })
            .then(res => {
                if(res.data.error){
                    return showToast(res.data.error, 'error');
                }
                setFormData({
                    ...formData,
                    name: '',
                    email: '',
                    password: '',
                    passwordConfirm: ''
                });
                setLoading(false);
                return showToast(res.data.message, 'success');
            })
            .catch(err => {
                if(err?.response?.data.error) return showToast(err.response.data.error, 'error');
                return showToast('Sorry, Something went wrong!');
            })
    }

    return (
        <>
            <form className="sign-up-form" onSubmit={onSubmit}>
                <h2 className="title">Sign Up</h2>
                <div className="input-field">
                    <i className="fa fa-user"></i>
                    <input type="text" placeholder="Name" onChange={handleChange("name")}  value={name}  />
                </div>
                <div className="input-field">
                    <i className="fa fa-envelope"></i>
                    <input type="email" placeholder="Email" onChange={handleChange("email")} value={email}  />
                </div>
                <div className="input-field">
                    <i className="fa fa-lock"></i>
                    <input type="password" placeholder="Password" onChange={handleChange("password")} value={password}  />
                </div>
                <div className="input-field">
                    <i className="fa fa-lock"></i>
                    <input type="password" placeholder="Confirm Password" onChange={handleChange("passwordConfirm")} value={passwordConfirm}  />
                </div>
                <button type="submit" className="btn solid" disabled={loading}>Join us</button>
                <p className="social-text">Or Sign in with email or Social platforms</p>
                <button className="btn secondary" onClick={changeMode} >Sign In</button>
            </form>
        </>
    )
}

export default Signup
