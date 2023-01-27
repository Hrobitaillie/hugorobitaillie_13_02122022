import axios from "axios";
import { useDispatch } from "react-redux";

const API_URL = process.env.REACT_APP_API_URL
const errorDetected = (error) =>{
    console.log("An error as expected", error);
}


export const fetchUserBankAccounts = async () => {
    try{
        return await axios.post( 
            API_URL + "profile",
            {},
            {
                headers: {Authorization: `Bearer ${localStorage.token}`}
            }
        );
    } catch(error){
        errorDetected(error)
    }
}

export const requestChangeUserNames = async (userData) =>{
    try{
        const response = await axios.put( 
            API_URL + "profile",
            {
                "firstName": userData.firstName,
                "lastName": userData.lastName
            },
            {
                headers: {Authorization: `Bearer ${localStorage.token}`}
            }
        );
        return response
    } catch(error){
        return error.response
    }
}