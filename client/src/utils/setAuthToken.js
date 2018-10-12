import axios from 'axios';

// add authorization header to every requests if we logged in
const setAuthToken = token =>{
    if(token){
        // Apply to every request
        axios.defaults.headers.common['Authorization'] = token;
    } else{
        // Delete auth header. if !token
        delete axios.defaults.headers.common['Authorization'];

    }
}

export default setAuthToken;