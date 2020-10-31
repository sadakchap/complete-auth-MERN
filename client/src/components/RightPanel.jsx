import React from 'react';
import loginImg from '../assets/img/login.svg';

const RightPanel = ({ changeMode }) => {
    return (
        <div className="panel right-panel">
            <div className="content">
                <h3>One of us?</h3>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, ducimus expedita in aperiam autem ?</p>
                <button className="btn transparent" id="sign-in-form" onClick={changeMode}>Log in</button>
            </div>
            <img src={loginImg} alt="signup svg" className="image" />
        </div>
    )
}

export default RightPanel
