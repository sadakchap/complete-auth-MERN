import React from 'react';
import { isAuth, signout } from '../../helpers/auth';
import userDashboardImg from '../../assets/img/user_dashboard.svg';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const UserDashboard = () => {
    const user = isAuth();
    const history = useHistory();

    const handleClick = e => {
        signout(() => {
            toast.success('You are logged out!');
            setTimeout(() => {
                history.push('/');
            }, 2000);
        })
    }

    return (
        <>
            <ToastContainer />
            <div className="container-fluid min-h-screen grid col-lg-2 col-md-1">
                <div className="content">
                    <h2>Welcome back, {user.name}!</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae pariatur iste, dolorem vero unde laudantium eos odit neque aliquid! Quis, eos. Ex modi aperiam dolorum dolores excepturi provident pariatur error!</p>
                    <button className="btn solid" onClick={handleClick} >Sign Out</button>
                </div>
                <div className="img-container">
                    <img src={userDashboardImg} alt="Password Reset" className="image image-fluid" />
                </div>
            </div>
        </>
    )
}

export default UserDashboard
