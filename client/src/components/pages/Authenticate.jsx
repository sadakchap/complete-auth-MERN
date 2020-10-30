import React, { useState } from 'react'
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

    return (
        <div className={`container ${mode}`}>
            <FormsContainer />
            <PanelsContainer changeMode={changeMode} />
        </div>
    )
}

export default Authenticate
