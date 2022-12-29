import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL

const errorDetected = (error) =>{
    console.log("An error as expected", error);
  }

const loginConfig = {
    headers: {  Authorization: `Bearer ${localStorage.token}`,
                'Content-Type' : 'application/json',
                'Accept' : 'application/json' }
};


export const fetchUserBankAccounts = async () => {
    try{
        const response = await axios.post( 
            API_URL + "profile",
            {},
            loginConfig
        );
        return response
    } catch(error){
        errorDetected(error)
    }
}