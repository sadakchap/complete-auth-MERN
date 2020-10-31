import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import FormsContainer from '../FormsContainer'
import PanelsContainer from '../PanelsContainer'

const Authenticate = () => {

    const [mode, setMode] = useState('');

    const changeMode = (e) => {
        e.preventDefault();
        console.log('changing mode');
        console.log(e.target.id);
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
        <div className={`container ${mode}`}>
            <ToastContainer />
            <FormsContainer showToast={showToast} />
            <PanelsContainer changeMode={changeMode} />
        </div>
    )
}

export default Authenticate
