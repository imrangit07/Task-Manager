import axios from 'axios';
import React from 'react'
import BACKEND_URL from '../config/Config';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from "react-toastify";
const EditModal = ({ selectedTask, setShowEditModal, loadTaskData }) => {
  const token = useSelector((state) => state.auth.token);

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    status: ""
  });

  const handelInput = (e) => {
    const { name, value } = e.target;
    setTaskData(Values => ({ ...Values, [name]: value }))
  }
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${BACKEND_URL}tasks/edit?id=${selectedTask._id}`, taskData, {
        headers: {
          "authorization": `Bearer ${token}`
        }
      })
      toast.success(res.data.massage)
      loadTaskData();
      setShowEditModal(false)
    } catch (error) {
      toast.error(error?.response?.data?.message || "Somthing went Wrong. Please try again");

    }
  }

  useEffect(() => {
    if (selectedTask) {
      setTaskData({
        title: selectedTask.title || '',
        description: selectedTask.description || '',
        dueDate: selectedTask.dueDate
          ? new Date(selectedTask.dueDate).toISOString().split('T')[0]
          : '',
        priority: selectedTask.priority || 'low',
        status: selectedTask.status || 'pending'
      });
    }
  }, [selectedTask]);
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Edit Task</h3>
          <button className="modal-close" onClick={() => setShowEditModal(false)}>×</button>
        </div>
        <div className="modal-body">
          {selectedTask && (
            <form>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  name='title'
                  value={taskData.title}
                  className="form-input"
                  onChange={handelInput}
                />
              </div>
              <div className='form-group'>
                <label>Description</label>
                <textarea
                  name='description'
                  value={taskData.description}
                  onChange={handelInput}
                  required />
              </div>
              <div className="form-group">
                <label>Due Date</label>
                <input
                  type="date"
                  name='dueDate'
                  value={taskData.dueDate}
                  className="form-input"
                  onChange={handelInput}
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select className="form-input" name='status'
                  value={taskData.status}
                  onChange={handelInput}>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>

                </select>
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select className="form-input" name='priority'
                  value={taskData.priority}
                  onChange={handelInput}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </form>
          )}
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleEditSubmit}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditModal