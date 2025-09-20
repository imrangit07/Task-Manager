import { useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch } from 'react-redux'
import { logout } from '../store/reducers/AuthSlice';

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
            <div className="user-dropdown">
            <div >
              <p className="header-username"><FaRegUserCircle style={{fontSize:"22px"}}/> <span className="user-name">{userdata.name}</span></p>
            </div>
            <div className="dropdown-menu">
              <button className="logout-btn"
              onClick={()=>dispatch(logout())}
              >Logout</button>
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