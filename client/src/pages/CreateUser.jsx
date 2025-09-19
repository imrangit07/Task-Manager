import { useState } from "react";
import GetUserDetails from "./GetUserDetails";
import axios from "axios";
import BACKEND_URL from "../config/Config";
import { useSelector } from "react-redux";

const CreateUser = () => {
  const token = useSelector((state) => state.auth.token);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    designation: ""
  });
  const handelInput = (e) => {
    const { name, value } = e.target;
    setUserData(Values => ({ ...Values, [name]: value }))
  }
  const handelSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${BACKEND_URL}auth/create-user`, userData, {
        headers: {
          "authorization": `Bearer ${token}`
        }
      });
      alert(res.data.message)

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="user-management-container">
      <div className="left-container">
        <div className="form-header">
          <p>Create New User</p>
        </div>
        <div className="form-container">
          <form >
            <div className='form-group'>
              <label>Name</label>
              <input type='text' placeholder='Enter User Name' name='name' onChange={handelInput} required />
            </div>
            <div className='form-group'>
              <label>email</label>
              <input type='email' placeholder='Enter Email' name='email' onChange={handelInput}
                required />
            </div>
            <div className="form-group">
              <label>Designation</label>
              <select name="designation" onChange={handelInput} required>
                <option value="">Select designation</option>
                <option value="manager">Manager</option>
                <option value="team-leader">Team Leader</option>
                <option value="frontend-dev">Frontend Developer</option>
                <option value="backend-dev">Backend Developer</option>
                <option value="designer">Designer</option>
                <option value="software-dev">Software Developer</option>
                <option value="UI/UX desig.">UI/UX Designer</option>
                <option value="Quality ana.">Quality Analyst</option>
                <option value="DevOps Eng.">DevOps Engineer</option>
              </select>
            </div>
            <button type="submit" className="submit-btn" onClick={handelSubmit}>
              Add User
            </button>
          </form>
        </div>
      </div>
      <div className="right-container">
        <GetUserDetails />

      </div>
    </div>
  )
}

export default CreateUser