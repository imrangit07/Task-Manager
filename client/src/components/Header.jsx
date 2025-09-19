import { useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";

const Header = () => {
  const userdata = useSelector((state) => state.auth.user);

  return (
    <div className="header-section">
      <div className="header-container">
        <div className="header-logo">
          <h2>TASK-MANAGER</h2>
        </div>
        <div className="header-user">
          {userdata ? (
            <div >
              <p className="header-username"><FaRegUserCircle style={{fontSize:"22px"}}/> <span className="user-name">{userdata.name}</span></p>
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