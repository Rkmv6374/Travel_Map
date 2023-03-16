import './register.css'
import React,{useState} from 'react'
import axios from 'axios'
import {Room,Cancel} from "@mui/icons-material"


export default function Registration ({ setShowRegister })
{
   
    const [success,setSuccess] = useState(false);
    const [error,setError] = useState(false);
    const [username,setUsername] = useState(null);
    const [password,setPassword] = useState(null);
    const [emailid,setEmailid] = useState(null);

    // now i have to get all the information 

    const handleSubmit=async(e)=>
    {
      e.preventDefault();
      const newuser = {
        name:username,
        password:password,
        email:emailid
      }
      try{
        await axios.post('/user/register',newuser);
        setSuccess(true);
        setError(false);
      }
      catch(err)
      {
        setError(false);
      }
    }

    return (

        <div className="registerContainer">
        <div className="logo">
          <Room className="logoIcon" />
          <span>AmanPin</span>
        </div>
        <form onSubmit={handleSubmit}>
          <input autoFocus placeholder="username"  onChange={(e)=>{setUsername(e.target.value)}}/>
          <input type="email" placeholder="email"   onChange={(e)=>{setEmailid(e.target.value)}}/>
          <input
            type="password"
            min="6"
            placeholder="password"
            onChange={(e)=>{setPassword(e.target.value)}}
          />
          <button className="registerBtn" type="submit">
            Register
          </button>
          {success && (
            <span className="success">Successfull. You can login now!</span>
          )}
          {error && <span className="failure">Something went wrong!</span>}
        </form>
        <Cancel
        className="registerCancel"
        onClick={() => setShowRegister(false)}
      />
       </div>
    );
}  