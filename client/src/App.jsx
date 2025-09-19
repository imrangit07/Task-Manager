import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Layout from "./Layout"
import Login from "./pages/Login"
import { useSelector } from "react-redux"
import Dashboard from "./pages/Dashboard"
import CreateUser from "./pages/CreateUser"


const App = () => {
  const isAuth = useSelector((state) => state.auth.token);
  const userdata = useSelector((state) => state.auth.user);

  console.log(userdata.role);

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
         <Route path="/dashboard" element={<Dashboard />} >
            <Route path="create-user" element={<CreateUser />} />
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App