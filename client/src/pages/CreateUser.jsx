import { useState } from "react";
import GetUserDetails from "./GetUserDetails";
import axios from "axios";
import BACKEND_URL from "../config/Config";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CreateUser = () => {
  const token = useSelector((state) => state.auth.token);
  const [load, setLoad] = useState(false)
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
      setUserData({
        name: "",
        email: "",
        designation: ""
      })
      toast.success(res.data.message)
      setLoad(!load)
    } catch (error) {
      toast.error(error?.response?.data?.message || "Somthing went Wrong. Please try again");

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
              <input type='text' placeholder='Enter User Name' value={userData.name} name='name' onChange={handelInput} required />
            </div>
            <div className='form-group'>
              <label>email</label>
              <input type='email' placeholder='Enter Email' value={userData.email} name='email' onChange={handelInput}
                required />
            </div>
            <div className="form-group">
              <label>Designation</label>
              <select name="designation" value={userData.designation} onChange={handelInput} required>
                <option value="">Select Designation</option>
                <option value="manager">Manager</option>
                <option value="team-leader">Team Leader</option>
                <option value="frontend-developer">Frontend Developer</option>
                <option value="backend-developer">Backend Developer</option>
                <option value="fullstack-developer">Full Stack Developer</option>
                <option value="software-developer">Software Developer</option>
                <option value="ui-ux-designer">UI/UX Designer</option>
                <option value="graphic-designer">Graphic Designer</option>
                <option value="quality-analyst">Quality Analyst</option>
                <option value="devops-engineer">DevOps Engineer</option>
                <option value="project-manager">Project Manager</option>
                <option value="product-owner">Product Owner</option>
                <option value="business-analyst">Business Analyst</option>
              </select>
            </div>
            <button type="submit" className="submit-btn" onClick={handelSubmit}>
              Add User
            </button>
          </form>
        </div>
      </div>
      <div className="right-container">
        <GetUserDetails load={load} />
      </div>
    </div>
  )
}

export default CreateUser