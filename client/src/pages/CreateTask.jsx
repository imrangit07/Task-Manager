import React, { useEffect } from 'react'
import { useState } from "react";
import GetUserDetails from "./GetUserDetails";
import axios from "axios";
import BACKEND_URL from "../config/Config";
import { useDispatch, useSelector } from "react-redux";
import { asyncAddTask } from '../store/actions/TaskActions';

const CreateTask = () => {
    const token = useSelector((state) => state.auth.token);

    const [taskData, setTaskData] = useState({
        title: "",
        designation: "",
        dueDate: "",
        priority: "low",
        assignedTo: ""
    });
    const [users, setUsers] = useState([]);

    const dispatch = useDispatch()

    const handelInput = (e) => {
        const { name, value } = e.target;
        setTaskData(Values => ({ ...Values, [name]: value }))
    }
    const handelSubmit = async (e) => {
        e.preventDefault()
        dispatch(asyncAddTask({task:taskData,token}))
    }

    const loadUserData = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}auth/all-users`, {
                headers: {
                    "authorization": `Bearer ${token}`
                }
            });
            setUsers(res.data)
        } catch (error) {

        }
    }
    console.log(users);


    useEffect(() => {
        loadUserData();
    }, [token])
    return (
        <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
            <div className="left-container" style={{maxWidth:"450px"}}>
                <div className="form-header">
                    <p>Create New Task</p>
                </div>
                <div className="form-container">
                    <form >
                        <div className='form-group'>
                            <label>Title</label>
                            <input type='text' placeholder='Enter User Name' name='title'
                                value={taskData.title}
                                onChange={handelInput} required />
                        </div>
                        <div className='form-group'>
                            <label>Description</label>
                            <textarea placeholder='Enter description' name='description'
                                value={taskData.description}
                                onChange={handelInput}
                                required />
                        </div>
                        <div className='form-group'>
                            <label>Due Date</label>
                            <input type='date'
                                name='dueDate'
                                value={taskData.dueDate}
                                onChange={handelInput}
                                required />
                        </div>
                        <div className="form-group">
                            <label>Priority</label>
                            <select name="priority"
                                value={taskData.priority}
                                onChange={handelInput} required>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Assign To</label>
                            <select name="assignedTo"
                                value={taskData.assignedTo}
                                onChange={handelInput} required>
                                {users.map((user) => (
                                    <option key={user._id} value={user._id}>{user.name}</option>
                                ))}
                            </select>
                        </div>


                        <button type="submit" className="submit-btn" onClick={handelSubmit}>
                            Create Task
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateTask