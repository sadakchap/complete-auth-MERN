import React from 'react';
import SignupImg from '../assets/img/signup.svg';

const RightPanel = ({ changeMode }) => {
    return (
        <div className="panel right-panel">
            <div className="content">
                <h3>One of us?</h3>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, ducimus expedita in aperiam autem ?</p>
                <button className="btn transparent" id="sign-in-form" onClick={changeMode}>Log in</button>
            </div>
            <img src={SignupImg} alt="login svg image" className="image"/>
        </div>
    )
}

export default RightPanel
