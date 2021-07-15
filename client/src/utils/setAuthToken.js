import axios from 'axios';

const setAuthToken = token => {
    if(token) {
        console.log("hie")
        axios.defaults.headers.common['x-auth-token'] = token;
        console.log("bye")
    }else {
        delete axios.defaults.headers.common['x-auth-token']
    }
}

export default setAuthToken;