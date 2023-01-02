import axios from "axios";

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
