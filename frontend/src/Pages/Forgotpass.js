import React, { useState } from 'react';
import axios from 'axios';
import './forgotpass.css'

function Forgotpass() {
    
    
      const [error, setError] = useState();
      const [loading,setLoading]= useState(false);
      const [showCodePage,setShowCodePage] = useState(false);
      const [showForgotPage,setShowForgotPage] = useState(false);
      const [userEmail,setUserEmail]= useState("");
      const [userCode,setUserCode]= useState("");
      const [newUserPass,setnewUserPass]= useState("");
      const [newConfirmPass,setnewConfirmPass]= useState("");
    
      
      const API_URL = process.env.REACT_APP_API_URL;
    
      const handleSendCode = async (userEmail) => {
        setLoading(true)
        try {
          const res = await axios.get(API_URL+`api/auth/sendCode/${userEmail}`);
          if (res.data === 'Code sent successfully') {
            setLoading(false)
            alert("Code sent to your email successfully")
            setShowCodePage(true)
          }
        } catch (err) {
          setError("An error occured please try again later.");
          console.log(err);
          setLoading(false)
        }
      };

      const handleSubmitCode = async (userCode) => {
        setLoading(true)
        try {
            const response = await axios.post(API_URL+'api/auth//verifyCode', { email: userEmail, code :userCode });
            const { message } = response.data;
            if (message === 'Code match') {
                setLoading(false)
                setShowCodePage(false)
                setShowForgotPage(true)
            } else {
                setError("Code does not match!");
            }
          } catch (error) {
            console.error('Error verifying code:', error);
            setError("An error occured please try again later.");
          setLoading(false)
          }
      };

      const handleChangePass = async (newPass, confirmPass) => {
        if (newPass !== confirmPass) {
          setError("New password and confirm password do not match!");
          return;
        }
        setLoading(true);
        try {
          const response = await axios.post(API_URL + 'api/auth/resetPassword', { email: userEmail, password: newPass });
          const { message } = response.data;
          if (message === 'Password reset successfully') {
            setLoading(false);
            setUserCode('')
            setUserEmail('')
            setnewUserPass('')
            setnewUserPass('')
            alert("Password reset successfully!");
            window.location.href="/signin"
          } else {
            setError("Error resetting password!");
            setLoading(false)
          }
        } catch (error) {
          console.error('Error resetting password:', error);
          setError("An error occured please try again later.");
          setLoading(false);
        }
      };

      const handleClose = ()=>{
        window.location.href="/signin"
      }
    return (
        <div className="forgotPass-container">
      <div className="forgotPass-card">
      <button className="forgotPass-close" onClick={()=> handleClose()}>Close</button>
        {!showCodePage && !showForgotPage &&<form>
          <h2 className="forgotPass-title"> Forgot Password</h2>
          <p className="line"></p>

          <div className="error-message">
            <p>{error}</p>
          </div>

          <div className="forgotPass-fields">
            <label>Account Email</label>
            <p>Please enter the email registered with your account</p>
            <input
            className='forgotPass-textbox'
              type="text"
              name="userFullName"
              placeholder="Enter Account Email"
              value={userEmail}
              onChange={(e)=>{setUserEmail(e.target.value)}}
            />
            <br />
          </div>

          <button className="forgotPass-button" type="submit" onClick={()=>handleSendCode(userEmail)}>{loading?(<div className="loading-mini"></div>):"Send Code"}</button>

        </form>}

        {showCodePage && !showForgotPage && <form>
          <h2 className="forgotPass-title"> Forgot Password</h2>
          <p className="line"></p>

          <div className="error-message">
            <p>{error}</p>
          </div>

          <div className="forgotPass-fields">
            <label>Submit Code</label>
            <input
            className='forgotPass-textbox'
              type="number"
              name="userFullName"
              placeholder="Enter Code Sent To Your Email"
              value={userCode}
              onChange={(e)=>{setUserCode(e.target.value)}}
            />
            <br />
          </div>

          <button className="forgotPass-button" type="submit" onClick={()=>handleSubmitCode(userCode)}>{loading?(<div className="loading-mini"></div>):"SUBMIT"}</button>

        </form>}

        {showForgotPage && <form>
          <h2 className="forgotPass-title"> Change Password</h2>
          <p className="line"></p>

          <div className="error-message">
            <p>{error}</p>
          </div>

          <div className="forgotPass-fields">
            <label>Enter New Password</label>
            <input
            className='forgotPass-textbox'
              type="password"
              minLength='6' placeholder="Enter New Password"
              name="userFullName"
              value={newUserPass}
              onChange={(e)=>{setnewUserPass(e.target.value)}}
            />
            <br />
            <label>Confirm New Password</label>
            <input
            className='forgotPass-textbox'
              type="password"
              minLength='6' placeholder="Enter New Password"
              name="userFullName"
              value={newConfirmPass}
              onChange={(e)=>{setnewConfirmPass(e.target.value)}}
            />
            <br />
          </div>

          <button className="forgotPass-button" type="submit" onClick={()=>handleChangePass(newUserPass,newConfirmPass)}>{loading?(<div className="loading-mini"></div>):"SUBMIT"}</button>

        </form>}
      </div>
    </div>
    );
}

export default Forgotpass;