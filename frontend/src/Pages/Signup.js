import React, { useContext, useState } from 'react'
import './Signup.css'
import axios from 'axios'
import { AuthContext } from '../Context/AuthContext.js'
// /import Switch from '@material-ui/core/Switch';

function Signup() {
    const [employeeId,setEmployeeId] = useState()
    const [userFullName,setUserFullName] = useState()
    const [email,setEmail]= useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState("")
    const { dispatch } = useContext(AuthContext)

    const API_URL = process.env.REACT_APP_API_URL
    
    const signupCall = async (userID,userEmail,userType, dispatch) => {
        dispatch({ type: "SIGNUP_START" });
        try {
            const res = await axios.post(API_URL+"api/auth/register", userID,userEmail,userType);
            dispatch({ type: "SIGNUP_SUCCESS", payload: res.data });
        }
        catch (err) {
            dispatch({ type: "SIGNUP_FAILURE", payload: err })
            setError("An error occured please try agian later")
        }
    }

    const handleForm = (e) => {
        e.preventDefault()
        const userType = 'Staff'
        signupCall({ userType,employeeId,email,password }, dispatch)
    }

    return (
        <div className='signup-container'>
            <div className="signup-card">
                <form onSubmit={handleForm}>
                    <h2 className="signup-title"> Sign Up</h2>
                    <p className="line"></p>
                    
                    <div className="error-message"><p>{error}</p></div>
                    <div className="signup-fields">
                        <label htmlFor="employeeId"> <b>{"Employee ID"}</b></label>
                        <input className='signup-textbox' type="text" placeholder={"Enter Employee ID"} name={"employeeId"} required onChange={(e) => {setEmployeeId(e.target.value)}}/>
                        <label className="userFullName" htmlFor="userFullName">{"Full Name"}<span className="required-field">*</span></label>
                        <input className="signup-textbox" type="text" name="userFullName" placeholder='Enter Full Name' value={userFullName} required onChange={(e) => setUserFullName(e.target.value)}></input>
                        <label htmlFor="Email"><b>{"Email"}</b></label>
                        <input className='signup-textbox' type="text" placeholder="Enter Email" name="eml" required onChange={(e) => { setEmail(e.target.value) }} />
                        <label htmlFor="password"><b>Password</b></label>
                        <input className='signup-textbox' type="password" minLength='6' placeholder="Enter Password" name="psw" required onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                    <button className="signup-button">Sign Up</button>
                    <a className="forget-pass" href="#home">Forgot password?</a>
                </form>
            </div>
        </div>
    )
}

export default Signup