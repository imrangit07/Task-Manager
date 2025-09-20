import axios from 'axios';
import React from 'react'
import BACKEND_URL from '../config/Config';
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";

const DeleteModal = ({selectedTask,setShowDeleteModal,loadTaskData}) => {
  const token = useSelector((state) => state.auth.token);
  
  const handleDeleteConfirm = async(e)=>{
     e.preventDefault();
    try {
      const res = await axios.delete(`${BACKEND_URL}tasks/delete?id=${selectedTask._id}`,{
        headers: {
          "authorization": `Bearer ${token}`
        }
      });
      toast.success(res.data.message)
      loadTaskData()
      setShowDeleteModal(false)
    } catch (error) {
      toast.error(error?.response?.data?.message || "Somthing went Wrong. Please try again");
    }
  }
  
  return (
     <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Delete Task</h3>
              <button className="modal-close" onClick={() => setShowDeleteModal(false)}>×</button>
            </div>
            <div className="modal-body">
              {selectedTask && (
                <div className="delete-confirmation">
                  <p>Are you sure you want to delete this task?</p>
                  <div className="task-preview">
                    <strong>{selectedTask.title}</strong>
                    <br />
                    <span>Due: {new Date(selectedTask.dueDate).toISOString().split('T')[0]}</span>
                  </div>
                </div>
              )}
                </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
              <button className="btn-danger" onClick={handleDeleteConfirm}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}


export default DeleteModal