import React, { useState } from 'react';
import forgotImg from '../../assets/img/forgot.svg';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';


const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        if(!email){
            return toast.error('Please enter Email!')
        }
        setLoading(true);
        axios.put(`${process.env.REACT_APP_API_URL}/user/password/forgot`, { email })
            .then(res => {
                if(res.data.error) return toast.error(res.data.error);
                setEmail('')
                return toast.success(res.data.message);
            })
            .catch(err => {
                if(err?.response?.data.error) return toast.error(err.response.data.error);
                return toast.error('Sorry, something went wrong!');
            })
        setLoading(false);
    }

    return (
        <>
            <ToastContainer />
            <div className="container-fluid min-h-screen grid col-lg-2 col-md-1">
                <div className="form-container">
                    <Link className="cancel-link" to="/">Cancel</Link>
                    <form className="forgot-form" onSubmit={handleSubmit}>
                        <h3>Please enter your Email address</h3>
                        <p className="help-text">We'll send you a password reset link to your registered Email Address.</p>
                        <div className="input-field">
                            <i className="fa fa-envelope"></i>
                            <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email}  />
                        </div>
                        
                        <button type="submit" className="btn solid" disabled={loading}>Send</button>
                        
                    </form>
                </div>
                <div className="img-container">
                        <img src={forgotImg} alt="Forgot password" className="image image-fluid" />
                </div>
            </div>
        </>
    )
}

export default ForgotPassword
