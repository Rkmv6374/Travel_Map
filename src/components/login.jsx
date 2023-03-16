import { Cancel, Room } from "@mui/icons-material";
import axios from "axios";
import {useState } from "react";
import "./login.css";

export default function Login({ setShowLogin, setUsername,myStorage }) {
  const [error, setError] = useState(false);
  const [usernameRef,setUsernameRef] = useState(null);
  const [passwordRef,setPasswordRef] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userid = {
      name: usernameRef,
      password: passwordRef
    };
    // console.log(user);
    try {
      const resi = await axios.post('/user/login', userid);
      console.log(resi);
      setUsername(resi.data.user);
      myStorage.setItem('user', resi.data.user);
      setShowLogin(false)

    } catch (err) {
      setError(true); 
      console.log(err);
    }
  };

  return (
    <div className="loginContainer">
      <div className="logos">
        <Room className="logoIcon" />
        <span>AmanPin</span>
      </div>
      <form onSubmit={handleSubmit}>
        <input autoFocus placeholder="username" onChange={(e)=>{setUsernameRef(e.target.value);}} />
        <input
          type="password"
          min="6"
          placeholder="password"
          onChange={(e)=>{setPasswordRef(e.target.value);}}
        />
        <button className="loginBtn" type="submit">
          Login
        </button>
        {error && <span className="failure">Something went wrong!</span>}
      </form>
      <Cancel className="loginCancel" onClick={() => setShowLogin(false)} />
    </div>
  );
}
