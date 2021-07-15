import React, { Fragment } from 'react'
import RegisterForm from '../../components/authForm/RegisterForm.component'
import Alert from '../../components/alert/alert.component'
import './login.styles.scss'

const Register = () => {
    
    return (
        <Fragment>
            <div className="auth-container">
                <div className="auth-img ">
                    <img src="/images/auth/tea-cup.png" alt="" className="img-fluid" />
                </div>
                <div className="auth-form">
                    <Alert/>
                    <RegisterForm/>
                </div>
            </div>
        </Fragment>
    )
}

export default Register
