import axios from 'axios';
import { REGISTER_SUCCESS , REGISTER_FAIL , USER_LOADED , AUTH_ERROR } from "./user.types";
import {setAlert} from '../alert/alert.actions'
// import setAuthToken from '../../utils/setAuthToken'


// Load User Registration
export const loadUser = () => async dispatch =>{
    console.log("start")
    // if(localStorage.token) {
    //     console.log("inside first")
    //     setAuthToken(localStorage.token)
    //     console.log("inside last")
    // }
    const config = {
        headers: {'x-auth-token' : localStorage.token}
    }
    console.log("middle")
    try {
        const res = await axios.get('http://localhost:5000/api/auth' , config);
        console.log(res);
        dispatch({
            type : USER_LOADED,
            payload : res.data
        })
    } catch (error) {
        dispatch({
            type : AUTH_ERROR
        })
    }
}


//Register the user
export const registerUser = ({username , email , password}) =>  async dispatch => {
    const config = {
        headers : {'Content-Type': 'application/json'}
    }

    const body = JSON.stringify({username, email, password});

    try {
        const res = await axios.post('/api/user/register' , body , config);
        console.log(res);
        dispatch({
            type: REGISTER_SUCCESS,
            payload : res.data
        })
        dispatch(loadUser())
    } catch (error) {
        console.log(error);

        const errors = error.response.data.errors;
        if(errors){
            errors.forEach(err => dispatch(setAlert(err.message , "danger")))
        }

        dispatch({
            type : REGISTER_FAIL
        })
    }
}

