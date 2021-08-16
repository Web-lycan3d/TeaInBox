/** @format */

import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";

import PropTypes from "prop-types";
import { loginUser } from "../../redux/user/user.actions";

import Form from "../form/form.component";
import Input from "../inputField/Input.component";
import SubmitButton from "../formButton/SubmitButton.component";
import "./loginForm.styles.scss";
import apiUrl from "../../apiUrl/api";
import axios from "axios";

const Schema = yup.object().shape({
  email: yup
    .string()
    .email("Email should have correct format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});
const backendUrl = apiUrl();

const LoginForm = ({ loginUser, isAuthenticated, message }) => {
  const [userError, setUserError] = useState(false);
  const [passwError, setPasswError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(Schema),
  });

  const onSubmit = async (data) => {
    const { email, password } = data;

    const resp = await axios.post(backendUrl + "/api/user/userauth", data);

    if (!resp.data.userExists) {
      setUserError(true);
      setPasswError(false);
    } else if (resp.data.wrongPass) {
      setPasswError(true);
      setUserError(false);
    } else {
      setUserError(false);
      setPasswError(false);
      loginUser({ email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <Fragment>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7 }}
        className="title">
        Login
      </motion.h1>
      {message && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="error-login-cart">
          Login first
        </motion.span>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7 }}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("email")}
            name="email"
            label="Email"
            type="email"
            error={!!errors.email}
            helperText={errors?.email?.message}
          />
          {userError && <span className="error">User doesn't exist</span>}
          <Input
            {...register("password")}
            name="password"
            label="Password"
            type="password"
            error={!!errors.password}
            helperText={errors?.password?.message}
          />
          {passwError && <span className="error">Wrong password</span>}
          <SubmitButton>LOGIN</SubmitButton>
        </Form>
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="no-account">
        Don't have an account,{" "}
        <Link className="link" to="/register">
          Sign up{" "}
        </Link>{" "}
        here
      </motion.span>
    </Fragment>
  );
};

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps, { loginUser })(LoginForm);
