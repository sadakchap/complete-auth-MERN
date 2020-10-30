import React from 'react'

const Signup = () => {
    return (
        <>
            <form className="sign-up-form">
                <h2 className="title">Sign Up</h2>
                <div className="input-field">
                    <i className="fa fa-user"></i>
                    <input type="text" name="name" placeholder="Name" />
                </div>
                <div className="input-field">
                    <i className="fa fa-envelope"></i>
                    <input type="email" name="email" placeholder="Email" />
                </div>
                <div className="input-field">
                    <i className="fa fa-lock"></i>
                    <input type="password" name="password" placeholder="Password" />
                </div>
                <button type="submit" className="btn solid">Join us</button>
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

export default Signup
