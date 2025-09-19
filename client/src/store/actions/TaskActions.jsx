import axios from "axios"
import BACKEND_URL from "../../config/Config";
import { addTasks } from "../reducers/TaskSlice";
import { useSelector } from "react-redux";


export const asyncAddTask = ({ task,token}) => async (dispatch) => {
    try {
        const res = await axios.post(`${BACKEND_URL}tasks/create-task`, task, {
            headers: {
                "authorization": `Bearer ${token}`
            }
        });
       
      dispatch(addTasks({task}));
      alert(res.data.message)
    } catch (error) {
        console.log(error);
    }
}


