/** @format */

import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./user.types";
import { setAlert } from "../alert/alert.actions";
import setAuthToken from "../../utils/setAuthToken";
import apiUrl from "../../apiUrl/api";

const backendUrl = apiUrl();
// Load User Registration
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  // const config = {
  //     headers: {'x-auth-token' : localStorage.token}
  // }
  try {
    const res = await axios.get(backendUrl + "/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Register the user
export const registerUser =
  ({ username, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const body = JSON.stringify({ username, email, password });
    try {
      const res = await axios.post(
        backendUrl + "/api/user/register",
        body,
        config
      );

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (error) {
      console.log(error);
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((err) => dispatch(setAlert(err.message, "danger")));
      }

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

//User Login
export const loginUser =
  ({ email, password }) =>
  async (dispatch) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const body = JSON.stringify({ email, password });
    try {
      const res = await axios.post(
        backendUrl + "/api/user/login",
        body,
        config
      );
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (error) {
      console.log(error);
      // const errors = error.response.data.errors;
      // if (errors) {
      //     errors.forEach(err => dispatch(setAlert(err.message, "danger")))
      // }
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

//logout / Clear Profile
export const logoutUser = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
