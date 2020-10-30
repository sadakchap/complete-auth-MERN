import React from 'react'

const Signin = () => {
    return (
        <>
            <form className="sign-in-form">
                <h2 className="title">Sign In</h2>
                <div className="input-field">
                    <i className="fa fa-envelope"></i>
                    <input type="email" name="email" placeholder="Email" />
                </div>
                <div className="input-field">
                    <i className="fa fa-lock"></i>
                    <input type="password" name="password" placeholder="Password" />
                </div>
                <button type="submit" className="btn solid">Log in</button>
                <p class="social-text">Or sign up with social platforms</p>
                    <div class="social-media">
                        <a href="#!" class="social-icons">
                            <i class="fa fa-facebook"></i>
                        </a>
                        <a href="#!" class="social-icons">
                            <i class="fa fa-twitter"></i>
                        </a>
                        <a href="#!" class="social-icons">
                            <i class="fa fa-github"></i>
                        </a>
                        <a href="#!" class="social-icons">
                            <i class="fa fa-google"></i>
                        </a>
                    </div>
            </form>
        </>
    )
}

export default Signin
