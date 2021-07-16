/** @format */

import React, { Fragment } from "react";
import LoginForm from "../../components/authForm/loginForm.component";
import "./login.styles.scss";

const Login = () => {
  return (
    <Fragment>
      <div className="auth-container">
        <div className="auth-img ">
          <img
            src="/images/auth/tea-cup.png"
            alt="error"
            className="img-fluid"
          />
        </div>
        <div className="auth-form">
          <LoginForm />
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
