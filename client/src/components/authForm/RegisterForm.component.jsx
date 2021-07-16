/** @format */

import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@material-ui/core";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setAlert } from "../../redux/alert/alert.actions";
import { registerUser } from "../../redux/user/user.actions";

import Form from "../form/form.component";
import Input from "../inputField/Input.component";
import SubmitButton from "../formButton/SubmitButton.component";
import "./loginForm.styles.scss";

const Schema = yup.object().shape({
  username: yup
    .string()
    .required("Name is required")
    .min(4, "Minimun of 4 letter is required")
    .matches(/^([^0-9]*)$/, "Name should not contain numbers"),
  email: yup
    .string()
    .required("Email is required")
    .email("Email should have correct format"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
      "Include @%&caps & at least 8 charcters"
    ),
  confirmPassword: yup
    .string()
    .required("Password is required")
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
      "Include @%&caps & at least 8 charcters"
    ),
});

const RegisterForm = ({ setAlert, registerUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(Schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    const { password, confirmPassword, email, username } = data;
    if (password !== confirmPassword) {
      setAlert("Password did not match", "danger");
    }
    registerUser({ username, email, password });
  };
  return (
    <Fragment>
      <h1>Register</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("username")}
          name="username"
          label="Username"
          type="text"
          error={!!errors.username}
          helperText={errors?.username?.message}
        />
        <Input
          {...register("email")}
          name="email"
          label="Email"
          type="email"
          error={!!errors.email}
          helperText={errors?.email?.message}
        />
        <Input
          {...register("password")}
          name="password"
          label="Password"
          type="password"
          error={!!errors.password}
          helperText={errors?.password?.message}
        />
        <Input
          {...register("confirmPassword")}
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          error={!!errors.confirmPassword}
          helperText={errors?.confirmPassword?.message}
        />
        <SubmitButton>Register</SubmitButton>
      </Form>
      <Typography
        component="span"
        size="0.5"
        color="textSecondary"
        align="center"
        clone>
        Already have an account,
        <Link className="link" to="/login">
          Login
        </Link>
        here
      </Typography>
    </Fragment>
  );
};

RegisterForm.propTypes = {
  setAlert: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, registerUser })(RegisterForm);
