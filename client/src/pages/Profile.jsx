import { useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import Account from "../components/Account";
import authService from "../features/auth/authService";
import { fetchUserBankAccounts } from "../services/useFetch";
import { store } from "../store/store";

export default function Profile(){

    
  const navigate = useNavigate()
  
  useEffect(() => {
    const token = localStorage.token
    console.log(token);
    if (!token ) {
      navigate('/login')
    }
  },[])

  const { data, isError, isLoading} = useQuery('user', () => fetchUserBankAccounts()) 
    if (data) {
      console.log(data.data);
    }
    
    return(
      isLoading ? (
        <p>Loading</p>

      ) : ( isError ? (
        <p>The is an error</p>

      ) : (
        <main className="main bg-dark">
          <div className="header">
            <h1>Welcome back<br />Tony Jarvis!</h1>
            <button className="edit-button">Edit Name</button>
          </div>
          <h2 className="sr-only">Accounts</h2>
          <Account />
        </main>
      ))
    )
}