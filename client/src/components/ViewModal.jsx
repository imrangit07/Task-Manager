import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BACKEND_URL from "../config/Config";
import axios from "axios";
import { toast } from "react-toastify";
const ViewModal = ({ selectedTask, setShowViewModal }) => {
  const token = useSelector((state) => state.auth.token);
  const [users, setUsers] = useState([]);
  const [selectUser, setSelectUser] = useState("");


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

  const handelAssign = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.put(`${BACKEND_URL}tasks/assign?id=${selectedTask._id}`, { userId: selectUser }, {
        headers: {
          "authorization": `Bearer ${token}`
        }
      });
      toast.success(res.data.message);
      setShowViewModal(false)

    } catch (error) {
      toast.error(error?.response?.data?.message || "Somthing went Wrong. Please try again");

    }
  }


  useEffect(() => {
    loadUserData();
  }, [token])

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <div>
            <h3 style={{ marginBottom: "4px" }}>Task Details:</h3>
            <span style={{ color: "gray" }}>Assigned To: {selectedTask.assignedTo?.name || "Unassigned"}</span>
          </div>


          <button className="modal-close" onClick={() => setShowViewModal(false)}>×</button>
        </div>
        <div className="modal-body">
          {selectedTask && (
            <div className="task-details">
              <div className="detail-row">
                <span className="detail-label">Title:</span>
                <span className="detail-value">{selectedTask.title}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Due Date:</span>
                <span className="detail-value">
                  {new Date(selectedTask.dueDate).toLocaleDateString()}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span className={`detail-value status-${selectedTask.status.toLowerCase()}`}>
                  {selectedTask.status}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Description:</span>
                <span className="detail-value">
                  {selectedTask.description || "No description available"}
                </span>
              </div>
            </div>
          )}
        </div>
        {
          // users?.assignedTo?.role === 'admin' ?
        <div className="modal-footer" style={{ display: 'flex', justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "20px", alignItems: "center", justifyContent: 'center' }}>
            <h3>Assign To : </h3>
            <div >
              <select
                style={{ padding: "10px 20px", borderRadius: "5px" }}
                name="assignedTo"
                value={selectUser}
                onChange={(e) => { setSelectUser(e.target.value) }} required
              >
                <option value={""} selected>Select User</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>{user.name}</option>
                ))}
              </select>
            </div>
          </div>
          <button className="btn-primary" onClick={handelAssign}>
            Assign
          </button>
        </div>
        // :
        // <div style={{padding:"10px 0"}}>
        //   <hr />
        // </div>
        }
      </div>
    </div>
  )
}

export default ViewModal