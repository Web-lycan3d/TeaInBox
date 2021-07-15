import React, { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { Link , Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import { loginUser } from '../../redux/user/user.actions'


import Form from '../form/form.component'
import Input from '../inputField/Input.component'
import SubmitButton from '../formButton/SubmitButton.component'
import './loginForm.styles.scss'

const Schema = yup.object().shape({
    email: yup.string().email("Email should have correct format").required("Email is required"),
    password: yup.string().required("Password is required")
})

const LoginForm = ({ loginUser , isAuthenticated }) => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: "onBlur",
        resolver: yupResolver(Schema)
    });

    const onSubmit = async data => {
        const { email, password } = data;

        loginUser({ email, password })
    }

    if(isAuthenticated) {
        return <Redirect to="/" />
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

LoginForm.propTypes = {
    loginUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    isAuthenticated : state.user.isAuthenticated
})

export default connect(mapStateToProps, { loginUser })(LoginForm)
