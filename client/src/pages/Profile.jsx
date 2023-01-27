import { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Account from "../components/Account";
import EditNamePopup from "../components/EditNamePopup";
import { checkTokenValidity } from "../features/auth/authSlice";
import { setnames } from "../features/userDatas/userDatasSlice";
import { fetchUserBankAccounts } from "../services/useFetch";

export default function Profile(){
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.token
    if (!token) {
      navigate('/login')
    }
  },[])

  const { data, isError, isLoading} = useQuery('user', () => fetchUserBankAccounts()) 
  const user = useSelector((state) => state.userDatas)

  useEffect(()=>{
    if (data) {
      const names = {
        lastName: data.data.body.lastName,
        firstName: data.data.body.firstName,
      }
      dispatch(setnames(names))
    }
  },[data])
  
  if (isLoading) {
    return(
      <p>Loading</p>
    )
  }else if (isError) {
    return(
      <p>There is an error</p>
    )
  }else if (data) {
    return(
      <>
        <main className="main bg-dark">
          <div className="header">
            <h1>Welcome back<br />{user.firstName + ' ' + user.lastName}!</h1>
            <EditNamePopup />
          </div>
          <h2 className="sr-only">Accounts</h2>
          <Account />
        </main>
      </>
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