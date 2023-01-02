import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function EditNamePopup(){
    const [formData, setFormData] = useState({
        firstName:'',
        lastName:'',
    })

    const {firstName, lastName} = formData

    const dispatch = useDispatch()

    const { user, isLoading, isError, isSucces, message} = useSelector(
        (state) => state.auth
    )

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
            <button className="edit-button" onClick={()=> {toggleEditNamePopup()}}>Edit Name</button>
            <div id="editNamePopup">
                <h2>Change your names</h2>
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
                    <button type="submit" className="sign-in-button">Sign In</button>
                </form>
            </div>
        </>
    )
}