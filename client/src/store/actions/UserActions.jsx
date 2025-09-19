 import axios from "axios"
 import BACKEND_URL from "../../config/Config";
 import { setAuth } from "../reducers/AuthSlice";
 
 export const asyncsignin = ({email,password})=>async(dispatch)=>{
    try {
      const res = await axios.post(`${BACKEND_URL}auth/sign-in`,{email,password});
      console.log(res.data.token);
      dispatch(setAuth({token:res.data.token,user:res.data.user}))
      alert(res.data.message)
    } catch (error) {
      alert(error);
    }
  }


 