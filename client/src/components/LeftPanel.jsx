import React from 'react';
import SignupImg from '../assets/img/signup.svg';


const LeftPanel = ({ changeMode }) => {
    return (
        <div className="panel left-panel">
            <div className="content">
                <h3>New Here?</h3>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, ducimus expedita in aperiam autem ?</p>
                <button className="btn transparent" id="sign-up-form" onClick={changeMode}>Sign up</button>
            </div>
            <img src={SignupImg} alt="login svg" className="image"/>
        </div>
    )
}

export default LeftPanel
