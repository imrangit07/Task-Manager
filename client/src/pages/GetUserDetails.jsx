import axios from "axios";
import { useEffect, useState } from "react"
import BACKEND_URL from "../config/Config";
import { useSelector } from "react-redux";

const GetUserDetails = () => {
     const token = useSelector((state) => state.auth.token);
 const [users,setUsers]=useState([]);



const loadUserData = async()=>{
    try {
        const res = await axios.get(`${BACKEND_URL}auth/all-users`,{
            headers:{
                "authorization":`Bearer ${token}`
            }
        });
        setUsers(res.data)
    } catch (error) {
        
    }
}
console.log(users);


useEffect(()=>{
loadUserData();
},[token])
  return (
    <div>
          <table className="user-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Designation</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user,index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.designation}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
    </div>
  )
}

export default GetUserDetails