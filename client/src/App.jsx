import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Layout from "./Layout"
import Login from "./pages/Login"
import { useSelector } from "react-redux"
import Dashboard from "./pages/Dashboard"
import CreateUser from "./pages/CreateUser"
import CreateTask from "./pages/CreateTask"
import TaskList from "./pages/TaskList"
import DashboardWell from "./components/DashboardWell"


const App = () => {
  const isAuth = useSelector((state) => state.auth.token);
  const userdata = useSelector((state) => state.auth.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>

          {!isAuth && <Route index element={<Login />} />}
          {/* <Route index element={isAuth?<Home/>:<Login/>}/> */}

          {isAuth && userdata?.role === "admin" && (
            <Route index element={<Navigate to="/dashboard" />} />
          )}

          {isAuth && userdata?.role === "user" && (
            <Route index element={<Home />} />
          )}

        </Route>
         {isAuth && 
         <Route path="/dashboard" element={<Dashboard />} >
            <Route index element={<DashboardWell/>}/>
            <Route path="create-user" element={<CreateUser />} />
            <Route path="create-task" element={<CreateTask />} />
            <Route path="task-list" element={<TaskList />} />
          </Route>
          }

          <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App