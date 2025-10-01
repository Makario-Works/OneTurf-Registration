import React from 'react'
import { NavLink } from "react-router-dom";
import { LuHouse } from "react-icons/lu";
import { RiDashboardLine, RiBillLine } from "react-icons/ri";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import './Styles/Sidebar.css'

const Sidebar = ({ isOpen }) =>  {
  
  return (

     <aside  className={`sidebar ${isOpen ? "active" : ""}`}>
      <ul className="sidebar-menu">
        <li>
          <NavLink to="DashBoard"  className={({ isActive }) => (isActive ? "active" : "")}>
            <RiDashboardLine size={20} /> <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="Estate"  className={({ isActive }) => (isActive ? "active" : "")}>
            <LuHouse size={20} /> <span>Estates</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="MarketPlace"  className={({ isActive }) => (isActive ? "active" : "")}>
            <HiOutlineBuildingStorefront size={20} /> <span>Market Place</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="Licensing"  className={({ isActive }) => (isActive ? "active" : "")}>
            <RiDashboardLine size={20} /><span>Licensing</span> 
          </NavLink>
        </li>
        <li>
          <NavLink to="Billing"  className={({ isActive }) => (isActive ? "active" : "")}>
            <RiBillLine size={20} /><span> Billing</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  )
}

export default Sidebar