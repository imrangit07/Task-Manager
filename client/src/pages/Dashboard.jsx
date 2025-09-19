import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Header from '../components/Header'

const Dashboard = () => {
    return (
        <div className='scroll-bar'>
            <Header />
            <div style={{ display: "flex" }}>
                <div style={{ width: "200px", height: "90vh", background: "#f4f4f4", padding: "10px" }}>
                    <h3>Dashboard Menu</h3>
                    <ul>
                        <li>
                            <Link to="create-user">Create User</Link>
                        </li>
                    </ul>
                </div>
                <div style={{ flex: 1, padding: "20px" }}>
                    <Outlet />
                </div>
            </div>
        </div>

    )
}

export default Dashboard