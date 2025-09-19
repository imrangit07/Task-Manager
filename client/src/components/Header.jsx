import { useDispatch, useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import { logout } from "../store/reducers/AuthSlice";

const Header = () => {
  const userdata = useSelector((state) => state.auth.user);

  const dispatch = useDispatch()
  return (
    <div className="header-section">
      <div className="header-container">
        <div className="header-logo">
          <h2>TASK-MANAGER</h2>
        </div>
        <div className="header-user">
          {userdata ? (
            <div>
            <div >
              <p className="header-username"><FaRegUserCircle style={{fontSize:"22px"}}/> <span className="user-name">{userdata.name}</span></p>
            </div>
            <div style={{cursor:"pointer"}}>
              <span onClick={()=>dispatch(logout())}>Logout</span>
            </div>
            </div>
          ) : (
            <p>Login</p>
          )}
        </div>

      </div>

    </div>
  )
}

export default Header