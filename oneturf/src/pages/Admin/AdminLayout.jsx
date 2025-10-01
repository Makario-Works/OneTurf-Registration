import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import DashBoard from './DashBoard'



const AdminLayout = () => {
  return (
    <div className="admin-layout">
        < Header/>
        <Sidebar />
       <DashBoard />
        <div className="admin-content">
            <Outlet />
        </div>
    </div>
  )
}

export default AdminLayout