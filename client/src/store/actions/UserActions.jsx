import axios from "axios"
import BACKEND_URL from "../../config/Config";
import { setAuth } from "../reducers/AuthSlice";
import { toast } from "react-toastify";
export const asyncsignin = ({ email, password }) => async (dispatch) => {
  try {
    const res = await axios.post(`${BACKEND_URL}auth/sign-in`, { email, password });
    dispatch(setAuth({ token: res.data.token, user: res.data.user }))
    toast.success(res.data.message)
  } catch (error) {
    toast.error(error?.response?.data?.message || "Somthing went Wrong. Please try again");
  }
}


