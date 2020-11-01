import React, { useState, useEffect } from 'react';
import resetImg from '../../assets/img/reset.svg';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useHistory } from 'react-router-dom';


const ResetPassword = ({ match }) => {

    const [formData, setFormData] = useState({
        password: '',
        passwordConfirm: '',
        token: ''
    });
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleChange = name => e => setFormData({ ...formData, [name]: e.target.value });

    const { password, passwordConfirm, token } = formData;

    useEffect(() => {
        const token = match.params.token;
        if(token){
            return setFormData({ ...formData, token: token});
        }
        return toast.error('Missing Reset link Token');
        // eslint-disable-next-line
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        if(!password || password !== passwordConfirm){
            return toast.error('Passwords must match!');
        }
        setLoading(true);
        axios.put(`${process.env.REACT_APP_API_URL}/user/password/reset`, { newPassword: password, token })
            .then(res => {
                if(res.data.error) return toast.error(res.data.error);
                setFormData({
                    password: '',
                    passwordConfirm: '',
                    token: ''
                });
                toast.success(res.data.message);
                setTimeout(() => {
                    history.push('/');
                }, 5000);
            })
            .catch(err => {
                if(err?.response?.data.error) return toast.error(err.response.data.error);
                return toast.error('Sorry, something went wrong!');
            })
    }

    return (
        <>
            <ToastContainer />
            <div className="container-fluid min-h-screen grid col-lg-2 col-md-1">
                <div className="form-container">
                    <form className="forgot-form" onSubmit={handleSubmit}>
                        <h3>Password Reset</h3>
                        <p className="help-text">Please Enter a strong password & remember it to.</p>
                        <div className="input-field">
                            <i className="fa fa-lock"></i>
                            <input type="password" placeholder="Password" onChange={handleChange("password")} value={password}  />
                        </div>
                        <div className="input-field">
                            <i className="fa fa-lock"></i>
                            <input type="password" placeholder="Confirm Password" onChange={handleChange("passwordConfirm")} value={passwordConfirm}  />
                        </div>
                        <button type="submit" className="btn solid" disabled={loading}>Reset</button>
                    </form>
                </div>
                <div className="img-container">
                        <img src={resetImg} alt="Password Reset" className="image image-fluid" />
                </div>
            </div>
        </>
    )
}

export default ResetPassword
