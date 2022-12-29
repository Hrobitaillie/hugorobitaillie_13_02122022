import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { toast, ToastContainer } from "react-toastify"
import {useSelector, useDispatch} from 'react-redux'
import { login, reset } from "../features/auth/authSlice"

export default function Login(){

    const [formData, setFormData] = useState({
        email:'',
        password:'',
    })

    const {email, password} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSucces, message} = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if (isError) {
            toast.error(message)
            console.log(message);
        }
        if (isSucces || user) {
            navigate('/profile')
        }
        
        dispatch(reset())
    },[user, isError, isSucces, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }
    
    const onSubmit = (e) => {
        e.preventDefault()
        const userData = {
            email,
            password
        }
        dispatch(login(userData))
    }

    return(
        <>
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign In</h1>
                    <form onSubmit={onSubmit}>
                        <div className="input-wrapper">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id="email"
                                name="email" 
                                value={email} 
                                placeholder="Email" 
                                onChange={onChange}
                            />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                value={password} 
                                placeholder="Mot de passe" 
                                onChange={onChange}
                                />
                        </div>
                        <div className="input-remember">
                            <input 
                                type="checkbox" 
                                id="remember-me" 
                                />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        {/* 
                            PLACEHOLDER DUE TO STATIC SITE 
                        */}
                        {/* <a href="./user.html" className="sign-in-button">Sign In</a> */}
                        {/* 
                            SHOULD BE THE BUTTON BELOW
                        */}
                        <button type="submit" className="sign-in-button">Sign In</button>
                    </form>
                </section>
            </main>
            <ToastContainer />
        </>
    )
}