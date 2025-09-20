import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import { useDispatch } from 'react-redux'
import { logout } from '../store/reducers/AuthSlice';


const Dashboard = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    return (
        <div className=' scroll-bar'>
            <Header />
            <div className='dashboard-layout'>
                <div className='dashboard-sidebar'>
                    <h3>Dashboard Menu</h3>
                    <ul className='dashboard-menu'>
                        <li>
                            <Link to="create-user" 
                            className={location.pathname.includes("create-user")?'active':''}
                            >Create User</Link>
                        </li>
                        <li>
                            <Link to="create-task"
                            className={location.pathname.includes("create-user")?'active':''}
                            >Create Task</Link>
                        </li>
                        <li>
                            <Link to="task-list"
                            className={location.pathname.includes("create-user")?'active':''}
                            >Task List</Link>
                        </li>
                    </ul>
                   
              <button className='logout-button' onClick={()=>dispatch(logout())}>Logout</button>
      
                </div> 
                    <div className="dashboard-content">

                    <Outlet />
                    </div>
            </div>
        </div>
    )
}

export default Dashboard