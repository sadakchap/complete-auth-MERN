import React from 'react'
import { isAuth, signout } from '../../helpers/auth';
import adminDashboardImg from '../../assets/img/admin.svg'
import { toast, ToastContainer } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const AdminDashboard = () => {
    const user = isAuth();
    const history = useHistory();

    const handleClick = e => {
        signout(() => {
            toast.success('You are Logged out now!');
            setTimeout(() => {
                history.push('/')
            }, 2000);
        })
    }

    return (
        <>
            <ToastContainer />
            <div className="container-fluid min-h-screen grid col-lg-2 col-md-1">
                <div className="content">
                    <h2>Welcome Admin, {user.name}!</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae pariatur iste, dolorem vero unde laudantium eos odit neque aliquid! Quis, eos. Ex modi aperiam dolorum dolores excepturi provident pariatur error!</p>
                    <button className="btn solid" onClick={handleClick} >Sign Out</button>
                </div>
                <div className="img-container">
                    <img src={adminDashboardImg} alt="Password Reset" className="image image-fluid" />
                </div>
            </div>
        </>
    )
}

export default AdminDashboard
