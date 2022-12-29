import axios from "axios";

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
export default authService