import { useDispatch, useSelector } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";

export default function Header(){

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state)=> state.auth)
    const token = localStorage.token

    const onLogout = () =>{
        dispatch(logout())
        dispatch(reset())
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
                            Profile
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