import React from 'react'
import { useState } from 'react'
import { useSelector } from "react-redux";
import BACKEND_URL from '../config/Config';
import { useEffect } from 'react';
import axios from 'axios';
import EditModal from '../components/EditModal';
import DeleteModal from '../components/DeleteModal';
import ViewModal from '../components/ViewModal';

const TaskList = () => {
  const token = useSelector((state) => state.auth.token);

  const [task, setTask] = useState([]);
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1);

  const [showEditModal, setShowEditModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)


  const loadTaskData = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}tasks/all-tasks?page=${page}&limit=4`, {
        headers: {
          "authorization": `Bearer ${token}`
        }
      });

      setTask(res.data.tasks)
      setPage(res.data.page)
      setPages(res.data.pages)
    } catch (error) {
      console.log(error);

    }
  }

  const handleEdit = (task) => {
    setSelectedTask(task)
    setShowEditModal(true)
  }

  const handleView = (task) => {
    setSelectedTask(task)
    setShowViewModal(true)

  }

  const handleDelete = (task) => {
    setSelectedTask(task)
    setShowDeleteModal(true)

  }

  useEffect(() => {
    loadTaskData();
  }, [page])

  return (
    <div className='task-list-container'>
      <h2 className='task-list-title'>Task List</h2>
      <div className="table-container">
        <table className='task-table'>
          <thead>
            <tr>
              <th>Title</th>
              {/* <th>Assign To</th> */}
              <th>Due Date</th>
              <th>Status</th>
              <th>Edig</th>
              <th>Action</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {task ? task.map((task) => (
              <tr key={task._id}>
                <td className='task-title'>{task.title}</td>
                {/* <td style={{ padding: "2px", border: "1px solid black" }}>{task.assignedTo.name}</td> */}
                <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                <td >
                  <span className={`status-badge status-${task.status.toLowerCase()}`}>{task.status}</span>
                </td>
                <td><button className='action-btn edit-btn'
                  onClick={() => handleEdit(task)}
                >Edit</button></td>
                <td><button className='action-btn view-btn'
                  onClick={() => handleView(task)}
                >View</button></td>
                <td >
                  <button className='action-btn delete-btn'
                    onClick={() => handleDelete(task)}
                  >Delete</button>
                </td>
              </tr>
            )) :
              <tr>
                <td colSpan="6" className='no-tasks-message'>
                  No tasks found</td></tr>}
          </tbody>
        </table>
      </div>
      <div className='pagination-controls'>
        <button
          className='pagination-btn'
          disabled={page === 1}
          onClick={() => setPage(page - 1)}>Previous</button>

        <span>Page {page} of {pages}</span>

        <button
          className='pagination-btn'
          disabled={page === pages}
          onClick={() => setPage(page + 1)}>Next</button>
      </div>

      {showEditModal &&
        <EditModal selectedTask={selectedTask} setShowEditModal={setShowEditModal} loadTaskData={loadTaskData}/>
      }
      {showViewModal &&
        <ViewModal selectedTask={selectedTask} setShowViewModal={setShowViewModal} loadTaskData={loadTaskData}/>
      }
      {showDeleteModal &&
        <DeleteModal selectedTask={selectedTask} setShowDeleteModal={setShowDeleteModal} loadTaskData={loadTaskData}/>
      }
    </div>
  )
}

export default TaskList