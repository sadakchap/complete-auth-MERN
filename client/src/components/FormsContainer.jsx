import React from 'react'
import Signin from './Signin'
import Signup from './Signup'

const FormsContainer = () => {
    return (
        <div className="signin-signup">
            <Signup />
            <Signin />
        </div>
    )
}

export default FormsContainer
