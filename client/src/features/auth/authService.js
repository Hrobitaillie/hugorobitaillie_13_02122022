import axios from "axios";
import jwt_decode from "jwt-decode";
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";

const API_URL = process.env.REACT_APP_API_URL

//login user

const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData);
    if(response.data){
        localStorage.setItem("token",response.data.body.token)
    }
    return response.data
}

const logout = async () => {
    localStorage.removeItem('token')
}

const authService = {
    login,
    logout,
}

export const checkingTokenValidity = () =>{
    let isTokenExpired = true
    const token = localStorage.token
    if (token) {
        const decodedToken = jwt_decode(token)
        let currentDate = new Date();
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            isTokenExpired = false
            console.log("Token has expired");
        } else {
            isTokenExpired = true
            console.log("Token is valid");
        }
        return isTokenExpired
    }
    console.log("Token Not found");
    return isTokenExpired
}

export default authService