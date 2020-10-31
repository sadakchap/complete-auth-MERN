import React from 'react'
import Signin from './Signin'
import Signup from './Signup'

const FormsContainer = ({ showToast, changeMode }) => {
    return (
        <div className="signin-signup">
            <Signup showToast={showToast} changeMode={changeMode} />
            <Signin showToast={showToast} />
        </div>
    )
}

export default FormsContainer
