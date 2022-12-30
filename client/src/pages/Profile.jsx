import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Account from "../components/Account";
import authService from "../features/auth/authService";
import { setnames, userState } from "../features/userDatas/userDatasSlice";
import { fetchUserBankAccounts } from "../services/useFetch";
import { store } from "../store/store";

export default function Profile(){

  useEffect(() => {
    const token = localStorage.token
    if (!token ) {
      navigate('/login')
    }
    
  },[])

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.userDatas)

  const { data, isError, isLoading} = useQuery('user', () => fetchUserBankAccounts()) 
  
  useEffect(()=>{
    if (data) {
      const names = {
        lastName: data.data.body.lastName,
        firstName: data.data.body.firstName,
      }
      console.log("names : ", names);
      dispatch(setnames(names))
    }
    
  },[data])
  
  if (isLoading) {
    return(
      <p>Loading</p>
    )
  }else if (isError) {
    return(
      <p>The is an error</p>
    )
  }else if (data) {
    return(
      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back<br />{user.firstName + ' ' + user.lastName}!</h1>
          <button className="edit-button">Edit Name</button>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <Account />
      </main>
    )
  }



  
  // return(
  //   isLoading ? (
  //     <p>Loading</p>

  //   ) : ( isError ? (
  //     <p>The is an error</p>

  //   ) : (
  //     <main className="main bg-dark">
  //       <div className="header">
  //         <h1>Welcome back<br />{user.firstName + ' ' + user.lastName}!</h1>
  //         <button className="edit-button">Edit Name</button>
  //       </div>
  //       <h2 className="sr-only">Accounts</h2>
  //       <Account />
  //     </main>
  //   ))
  // )
}