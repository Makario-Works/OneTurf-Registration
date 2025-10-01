import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import './Styles/AdminLayout.css';



const AdminLayout = () => {
   const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div className="admin-layout">
        < Header onMenuClick={toggleSidebar} />
        <Sidebar isOpen={sidebarOpen} />
        <div className="admin-content" onClick={() => sidebarOpen && setSidebarOpen(false)}>
            <Outlet />
        </div>
    </div>
  )
}

export default AdminLayout