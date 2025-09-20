import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import {useNavigate} from 'react-router-dom'
import { asyncsignin } from '../store/actions/UserActions';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isAuth = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle form submission
  const handelUserLogin = (e) => {
    e.preventDefault();
    dispatch(asyncsignin({email, password}))
  }

 
  useEffect(() => {
    isAuth && navigate("/");
  }, [isAuth, navigate]);

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