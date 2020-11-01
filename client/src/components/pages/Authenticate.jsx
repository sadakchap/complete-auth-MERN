import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { isAuth } from '../../helpers/auth';
import FormsContainer from '../FormsContainer';
import PanelsContainer from '../PanelsContainer';

const Authenticate = () => {

    const [mode, setMode] = useState('');

    const changeMode = (e) => {
        e.preventDefault();
        if(e.target.id === 'sign-up-form'){
            return setMode('sign-up-mode')
        }else{
            return setMode('');
        }
    }

    const showToast = (msg, status) => {
        const toastPosition = mode ? { position: "top-center" } : { position: "top-right" };
        if(status === 'error'){
            return toast.error(`${msg}`, toastPosition);
        }
        return toast.success(`${msg}`, toastPosition);
    }

    return (
        <>
            {isAuth() ? <Redirect to='/user/dashboard' /> : null }
            {isAuth() && isAuth().role === 1 ? <Redirect to='/admin/dashboard' /> : null }
            <div className={`container ${mode}`}>
                <ToastContainer />
                <FormsContainer showToast={showToast} changeMode={changeMode} />
                <PanelsContainer changeMode={changeMode} />
            </div>
        </>
    )
}

export default Authenticate
