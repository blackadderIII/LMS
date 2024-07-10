import React, {  useState } from "react";
import "./Signup.css";
import axios from "axios";

const Signup = () => {
  const [user, setUser] = useState({
    userType: "Staff",
    userFullName: "",
    admissionId: "",
    employeeId: "",
    age: "",
    dob: "",
    gender: "",
    address: "",
    mobileNumber: "",
    email: "",
    password: "",
    isAdmin: false,
  });

  const [error, setError] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(API_URL+"api/auth/register", user);
      if (res.status === 200) {
        alert("User created successfully!");
        window.location.href = "/signin"; // Redirect to signin page
      }
    } catch (err) {
      setError("An error occured please try again later.");
      console.log(err);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <form onSubmit={handleSubmit}>
          <h2 className="signup-title"> Sign Up</h2>
          <p className="line"></p>

          <div className="error-message">
            <p>{error}</p>
          </div>

          <div className="signup-fields">
            <label>Full Name:</label>
            <input
            className='signup-textbox'
              type="text"
              name="userFullName"
              placeholder="Enter Full Name"
              value={user.userFullName}
              onChange={handleChange}
            />
            <br />
            <label>Employee ID:</label>
            <input
            className='signup-textbox'
              type="text"
              name="employeeId"
              placeholder="Enter Employee ID"
              value={user.employeeId}
              onChange={handleChange}
            />
            <br />
            <label>Age:</label>
            <input
            className='signup-textbox'
              type="number"
              name="age"
              placeholder="Enter age"
              value={user.age}
              onChange={handleChange}
            />
            <br />
            <label>Date of Birth:</label>
            <input
            className='signup-textbox'
              type="date"
              name="dob"
              value={user.dob}
              onChange={handleChange}
            />
            <br />
            <label>Gender:</label>
            <input
            className='signup-textbox'
              type="text"
              name="gender"
              placeholder="Enter Gender"
              value={user.gender}
              onChange={handleChange}
            />
            <br />
            <label>Address:</label>
            <input
            className='signup-textbox'
              type="text"
              name="address"
              placeholder="Enter Residential Address"
              value={user.address}
              onChange={handleChange}
            />
            <br />
            <label>Mobile Number:</label>
            <input
            className='signup-textbox'
              type="number"
              name="mobileNumber"
              placeholder="Enter Phonenumber"
              value={user.mobileNumber}
              onChange={handleChange}
            />
            <br />
            <label>Email:</label>
            <input
            className='signup-textbox'
              type="email"
              name="email"
              placeholder="Enter Email Address"
              value={user.email}
              onChange={handleChange}
            />
            <br />
            <label>Password:</label>
            <input
            className='signup-textbox'
              type="password" minLength='6' placeholder="Enter Password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
            <br />
            {/* <label>Is Admin:</label>
            <input
              type="checkbox"
              name="isAdmin"
              checked={user.isAdmin}
              onChange={handleChange}
            />
            <br /> */}
          </div>

          <button className="signup-button" type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

// import { AuthContext } from '../Context/AuthContext.js'
// // /import Switch from '@material-ui/core/Switch';

// function Signup() {
//     const [employeeId,setEmployeeId] = useState()
//     const [userFullName,setUserFullName] = useState()
//     const [email,setEmail]= useState()
//     const [password, setPassword] = useState()
//     const [error, setError] = useState("")
//     const { dispatch } = useContext(AuthContext)

//     const API_URL = process.env.REACT_APP_API_URL

//     const signupCall = async (userID,userType,userEmail,userPassword, dispatch) => {
//         dispatch({ type: "SIGNUP_START" });
//         try {
//             const res = await axios.post(API_URL+"api/auth/register", userID,userEmail,userType,userPassword);
//             dispatch({ type: "SIGNUP_SUCCESS", payload: res.data });
//         }
//         catch (err) {
//             dispatch({ type: "SIGNUP_FAILURE", payload: err })
//             setError("An error occured please try agian later")
//         }
//     }

//     const handleForm = (e) => {
//         e.preventDefault()
//         const userType = 'Staff'
//         signupCall({ employeeId,userType,email,password }, dispatch)
//     }

//     return (
//         <div className='signup-container'>
//             <div className="signup-card">
//                 <form onSubmit={handleForm}>
//                     <h2 className="signup-title"> Sign Up</h2>
//                     <p className="line"></p>

//                     <div className="error-message"><p>{error}</p></div>
//                     <div className="signup-fields">
//                         <label htmlFor="employeeId"> <b>{"Employee ID"}</b></label>
//                         <input className='signup-textbox' type="text" placeholder={"Enter Employee ID"} name={"employeeId"} required onChange={(e) => {setEmployeeId(e.target.value)}}/>
//                         <label className="userFullName" htmlFor="userFullName">{"Full Name"}<span className="required-field">*</span></label>
//                         <input className="signup-textbox" type="text" name="userFullName" placeholder='Enter Full Name' value={userFullName} required onChange={(e) => setUserFullName(e.target.value)}></input>
//                         <label htmlFor="Email"><b>{"Email"}</b></label>
//                         <input className='signup-textbox' type="text" placeholder="Enter Email" name="eml" required onChange={(e) => { setEmail(e.target.value) }} />
//                         <label htmlFor="password"><b>Password</b></label>
//                         <input className='signup-textbox' type="password" minLength='6' placeholder="Enter Password" name="psw" required onChange={(e) => { setPassword(e.target.value) }} />
//                         </div>
//                     <button className="signup-button">Sign Up</button>
//                     <a className="forget-pass" href="#home">Forgot password?</a>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default Signup
