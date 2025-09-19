import { useSelector } from "react-redux";


const DashboardWell = () => {
    const userdata = useSelector((state) => state.auth.user);
  return (
    <div className="welcome-message">
        <h2>Welcome Back, {userdata?.name || 'User'} </h2>
    </div>
  )
}

export default DashboardWell