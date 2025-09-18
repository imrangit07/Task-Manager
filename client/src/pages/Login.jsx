import React, { useState } from 'react'
import {useDispatch} from "react-redux"
import { setAuth } from '../slice/AuthSlice';
import BACKEND_URL from "../config/Config";
import axios from "axios"
const Login = () => {
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");



const dispatch = useDispatch();

  const handelUserLogin = async(e)=>{
    e.preventDefault();
    try {
      const res = await axios.post(BACKEND_URL,{email,password});
      console.log(res.data.token);
      dispatch(setAuth({token:res.data.token,user:res.data.user}))
      alert(res.data.message)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='container'>
      <div className="login-container">
        <div className="login-header">
          <div className="logo">
            Login
          </div>
          <div className="para">
            <p>Sign in for access more features</p>
          </div>
        </div>

        <form className='login-form'>
                  <div className="form-group">
                    <label>Email</label>
                    <div className="form-inputs">
                       <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <div className="form-inputs">
                       <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your Password"
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                    </div>

                  </div>
                  <div className="login-btn">
                    <button type="submit" className="login-button" onClick={handelUserLogin}>
                        Sign In
                    </button>
                  </div>
        </form>
      </div>
    </div>
  )
}

export default Login;