import axios from "axios";
import "../styles/Home.css";
import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import BACKEND_URL from "../config/Config";
import TaskDetails from "../components/TaskDetails";

const Home = () => {
  const token = useSelector((state) => state.auth.token);

  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");

  const [loadTaskData, setLoadTaskData] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)

  const priorityColors = {
    high: "rgba(244, 67, 54, 0.8)",
    medium: "rgba(255, 152, 0, 0.8)",
    low: "rgba(76, 175, 80, 0.8)"
  };


  // Filtered tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const statusMatch = filterStatus === "all" || task.status === filterStatus;
      const priorityMatch =
        filterPriority === "all" || task.priority === filterPriority;
      return statusMatch && priorityMatch;
    });
  }, [tasks, filterStatus, filterPriority]);

  // Fetch tasks of logged-in user
  const getTasks = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}tasks/user-task`, {
        headers: { authorization: `Bearer ${token}` }
      });
      setTasks(res.data.tasks || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  // Update task status
  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const res = await axios.patch(
        `${BACKEND_URL}tasks/change-status?id=${taskId}`,
        { status: newStatus },
        { headers: { authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message);
      getTasks();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error updating task");
    }
  };

  useEffect(() => {
    getTasks();
  }, []);
  console.log(filteredTasks);


  return (
    <div className="dashboard-container">
      <div className="right-container">
        {/* Header & Filters */}
        <div className="task-header">
          <h2>My Task Dashboard</h2>
          <div className="task-filters">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="task-stats">
          <div className="stat-card total">
            <span className="stat-number">{tasks.length}</span>
            <span className="stat-label">Total Tasks</span>
          </div>
          <div className="stat-card pending">
            <span className="stat-number">
              {tasks.filter((t) => t.status === "pending").length}
            </span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat-card in-progress">
            <span className="stat-number">
              {tasks.filter((t) => t.status === "in-progress").length}
            </span>
            <span className="stat-label">In Progress</span>
          </div>
          <div className="stat-card completed">
            <span className="stat-number">
              {tasks.filter((t) => t.status === "completed").length}
            </span>
            <span className="stat-label">Completed</span>
          </div>
        </div>

        {/* Task List */}
        <div className="task-list" >
          {filteredTasks.length === 0 ? (
            <p className="no-tasks-message" style={{textAlign:"center"}}>No tasks found</p>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task._id}
                className={`task-card ${task.priority}`}
                style={{ position: "relative" }}
                onDoubleClick={() =>{ 
                  setShowDetails(true)
                  setSelectedTask(task)
                }}
              >
                <div className="task-card-header">
                  <h4>{task.title.split(" ").slice(0,4).join(" ")}...</h4>
                  <div className="status-selector">
                    <select
                      value={task.status}
                      onChange={(e) => updateTaskStatus(task._id, e.target.value)}
                      className={`status-dropdown ${task.status}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
                <p className="task-description">{task.description.split(" ").slice(0, 9).join(" ")}...</p>
                <div className="task-card-footer">
                  <span className="task-assignee">
                    {task.assignedTo?.name || "Unassigned"}
                  </span>
                  <div className="task-meta">
                    <span className="task-date">
                      Due: {new Date(task.dueDate).toLocaleDateString("en-IN")}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    width: "100%",
                    textAlign: "center",
                    marginTop: "15px",
                    color: "#fff",
                    padding: "5px",
                    fontWeight: "600",
                    borderRadius: "4px",
                    backgroundColor:
                      priorityColors[task.priority] || priorityColors.low
                  }}
                >
                  {task.status === "completed"
                    ? `Completed: ${task.completedAt
                      ? new Date(task.completedAt).toLocaleDateString("en-IN")
                      : "Not Yet"
                    }`
                    : task.priority}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showDetails &&
        <TaskDetails selectedTask={selectedTask} setShowDetails={setShowDetails} loadTaskData={loadTaskData} />
      }
    </div>
  );
};

export default Home;
