import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { requestChangeUserNames } from "../services/useFetch"
import { setnames } from "../features/userDatas/userDatasSlice"

export default function EditNamePopup(){
    const [formData, setFormData] = useState({
        firstName:'',
        lastName:'',
    })
    const [isEditNamePopupActive, setIsEditNamePopupActive] = useState(false)
    const {firstName, lastName} = formData
    const dispatch = useDispatch()

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        changeUserNames()
    }

    async function changeUserNames() {
        const userData = {
            firstName,
            lastName
        }
        const { data } = await requestChangeUserNames(userData)
        if (data.status == 200) {
            dispatch(setnames(userData))
            toggleEditNamePopup()
        }else{
            switch (data.status) {
                case 400:
                    alert("An error has expected\n Invalid Fields")
                    break;
                case 500:
                    alert("An error has expected\n Internal Server Error")
                    break;
                default:
                    alert("An error has expected\n"+ data.message)
                    break;
            }
        }
    }

    function toggleEditNamePopup(){
        setIsEditNamePopupActive(!isEditNamePopupActive)
    }

    return(
        <>
            <button className="edit-button" onClick={()=> {toggleEditNamePopup()}}>Edit Name</button>
            <div className={isEditNamePopupActive ? "overlay active" : "overlay"}></div>
            <div id="editNamePopup" className={isEditNamePopupActive ? " active" : null }>
                <FontAwesomeIcon icon={["fas", "xmark"]} size="xl" className="closebutton" onClick={()=> {toggleEditNamePopup()}}/>
                <h2>Change your names</h2>
                <form onSubmit={onSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="firstName">Firstname</label>
                        <input 
                            type="firstName" 
                            id="firstName"
                            name="firstName" 
                            value={firstName} 
                            placeholder="" 
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="lastName">Lastname</label>
                        <input 
                            type="lastName" 
                            id="lastName" 
                            name="lastName" 
                            value={lastName} 
                            onChange={onChange}
                            required
                            />
                    </div>
                    <button type="submit" className="sign-in-button">Submit</button>
                </form>
            </div>
        </>
    )
}