import { useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";

const Header = () => {
  const userdata = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  console.log("header", token);

  return (
    <div className="header-section">
      <div className="header-container">
        <div className="header-logo">
          <h2>Header</h2>
        </div>
        <div className="header-user">
          {userdata ? (
            <div>
              <p><FaRegUserCircle/> {userdata.name}</p>
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