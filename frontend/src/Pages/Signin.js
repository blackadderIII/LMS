import React, { useContext, useState } from 'react'
import './Signin.css'
import axios from 'axios'
import { AuthContext } from '../Context/AuthContext.js'
import Switch from '@material-ui/core/Switch';

function Signin() {
    const [isStudent, setIsStudent] = useState(true)
    const [admissionId, setAdmissionId] = useState()
    const [employeeId,setEmployeeId] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState("")
    const [loading,setLoading]= useState(false);
    const { dispatch } = useContext(AuthContext)

    const API_URL = process.env.REACT_APP_API_URL
    
    const loginCall = async (userCredential, dispatch) => {
        dispatch({ type: "LOGIN_START" });
        setLoading(true)
        try {
            const res = await axios.post(API_URL+"api/auth/signin", userCredential);
            
            if (res.data==="User not found"){   
            setError("User does not Exist.")
            setLoading(false)
            return
            }
            if (res.data==="Wrong Password"){   
            setError("Wrong User Id Or Password.")
            setLoading(false)
            return
            }
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            setLoading(false)
        }
        catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err })
            setError("An error occured,Please try again later.")
            setLoading(false)
        }
    }

    const handleForm = (e) => {
        e.preventDefault()
        isStudent
        ? loginCall({ admissionId, password }, dispatch) 
        : loginCall({ employeeId,password }, dispatch)
    }

    return (
        <div className='signin-container'>
            <div className="signin-card">
                <form onSubmit={handleForm}>
                    <h2 className="signin-title"> Log in</h2>
                    <p className="line"></p>
                    <div className="persontype-question">
                        <p>Are you a Staff member ?</p>
                        <Switch
                            onChange={() => setIsStudent(!isStudent)}
                            color="primary"
                        />
                    </div>
                    <div className="error-message"><p>{error}</p></div>
                    <div className="signin-fields">
                        <label htmlFor={isStudent?"admissionId":"employeeId"}> <b>{isStudent?"Student  ID":"Employee ID"}</b></label>
                        <input className='signin-textbox' type="text" placeholder={isStudent?"Enter Student ID":"Enter Employee ID"} name={isStudent?"admissionId":"employeeId"} required onChange={(e) => { isStudent?setAdmissionId(e.target.value):setEmployeeId(e.target.value) }}/>
                        <label htmlFor="password"><b>Password</b></label>
                        <input className='signin-textbox' type="password" minLength='6' placeholder="Enter Password" name="psw" required onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                    <button className="signin-button">{loading?(<div className="loading-mini"></div>):"Log In"}</button>
                    <a className="forget-pass" href="#home">Forgot password?</a>
                    <p className="signup-question">Don't have an account? Contact Librarian</p>
                </form>
                <div className='signup-option'>
                    <a className="forget-pass" href="/signup"> are you a Librarian staff member? Sign Up</a>
                </div>
            </div>
        </div>
    )
}

export default Signin