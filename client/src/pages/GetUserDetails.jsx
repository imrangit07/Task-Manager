import axios from "axios";
import { useEffect, useState } from "react"
import BACKEND_URL from "../config/Config";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
const GetUserDetails = ({load}) => {
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
      toast.error(error?.response?.data?.message || "Somthing went Wrong. Please try again");
    }
}
const deleteUser = async(id)=>{   
    try {
        const res = await axios.delete(`${BACKEND_URL}auth/delete?id=${id}`,{
            headers:{
                "authorization":`Bearer ${token}`
            }
        });
        toast.success(res.data.message)
        loadUserData()
    } catch (error) {
      toast.error(error?.response?.data?.message || "Somthing went Wrong. Please try again");
    }
}




useEffect(()=>{
loadUserData();
},[token,load])
  return (
    <div>
          <table className="user-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Designation</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user,index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.designation}</td>
                            <td style={{textAlign:"center",color:"red",fontSize:"18px",cursor:"pointer"}}
                            onClick={()=>{deleteUser(user._id)}}
                            ><MdDelete/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
    </div>
  )
}

export default GetUserDetails