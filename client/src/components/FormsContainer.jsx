import React from 'react'
import Signin from './Signin'
import Signup from './Signup'

const FormsContainer = ({ showToast }) => {
    return (
        <div className="signin-signup">
            <Signup showToast={showToast} />
            <Signin showToast={showToast} />
        </div>
    )
}

export default FormsContainer
