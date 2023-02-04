import { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";
import { resetUserInfos, setnames } from "../features/userDatas/userDatasSlice";
import { fetchUserBankAccounts } from "../services/useFetch";

export default function Header(){

    const navigate = useNavigate()
    const dispatch = useDispatch()

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

    const firstName = user.firstName

    const token = localStorage.token

    const onLogout = () =>{
        dispatch(logout())
        dispatch(reset())
        dispatch(resetUserInfos())
        navigate('/')
    }

    return(
        <nav className="main-nav">
            <Link to="/" className="main-nav-logo">
                <img
                    className="main-nav-logo-image"
                    src="./assets/img/argentBankLogo.png"
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                {token ? (
                    <>
                        <Link to='/profile' className="main-nav-item">
                            <i className="fa fa-user-circle"></i>
                            {firstName === "<placeholder>" ?("Profile") : firstName}
                        </Link>
                        <Link to='' onClick={onLogout} className="main-nav-item">
                            <i className="fa fa-user-circle"></i>
                            Logout
                        </Link>
                    </>
                ):(
                    <Link to='/login' className="main-nav-item">
                        <i className="fa fa-sign-out"></i>
                        Sign In
                    </Link>
                )}
            </div>
        </nav>
    )
};