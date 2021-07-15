import React, { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import {Link} from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Typography } from '@material-ui/core'

import Form from '../form/form.component'
import Input from '../inputField/Input.component'
import SubmitButton from '../formButton/SubmitButton.component'
import './loginForm.styles.scss'

const Schema = yup.object().shape({
    email : yup.string().email("Email should have correct format").required("Email is required"),
    password: yup.string().required("Password is required")
})

const LoginForm = () => {
    const { register, handleSubmit, formState : {errors} } = useForm({
        mode: "onBlur",
        resolver: yupResolver(Schema)
    });
    
    const onSubmit = (data) => {
        console.log(data);
    }
    return (
        <Fragment>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
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
                <SubmitButton>Login</SubmitButton>
            </Form>
            <Typography component="span" size color="textSecondary" align="center" clone>Don't have an account, <Link className="link" to="/register">Sign up </Link> here</Typography>
        </Fragment>
    )
}

export default LoginForm
