import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const ConfirmEmail = ({ match }) => {

    const [token, setToken] = useState('');
    const [loading, setLoading] = useState('');

    useEffect(() => {
        const token = match.params.token;
        if(token){
            return setToken(token);
        }
        return toast.error('Missing token!')
        // eslint-disable-next-line
    }, []);

    
    const onSubmit = e => {
        e.preventDefault();
        setLoading(true);
        axios.post(`${process.env.REACT_APP_API_URL}/verify`, { token })
            .then(res => {
                if(res.data.error) return toast.error(res.data.error)
                setToken('')
                return toast.success(res.data.message);
                //TODO: redirect to login page
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
            <div className="container-fluid">
                <h2>Confirm my email address</h2>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam praesentium rerum repudiandae tempore similique, quas earum a perferendis est!</p>
                <form method="post" onSubmit={onSubmit}>
                    <button type="submit" className="btn solid" disabled={loading}>Confirm Email</button>
                </form>
            </div>
        </>
    )
}

export default ConfirmEmail
