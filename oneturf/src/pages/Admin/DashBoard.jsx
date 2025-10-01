import React from 'react'
import { LuHouse } from "react-icons/lu";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { HiOutlineUsers } from "react-icons/hi2";


const DashBoard = () => {
  return (
    <div className= 'dashboard'>
        <h2>Dashboard</h2>
      <div className="dashboard-cards">
        <div className='revenue card'>
        <p>Revennue</p>
        <p className='big'>N20,345,904.03</p>
        <span> <FaArrowTrendUp /><p>34.5%</p></span>
        </div> 
        <div className='users card'>
          <div className="icon">
               <HiOutlineUsers  size='26px' color='blue' />
          </div>
          <div className="info">
            <p className='title'>Users</p>
            <p className='big'>758,291</p>
            <span> <FaArrowTrendDown /><p>5.9%</p></span>
          </div>
       
        </div>
        <div className='estate card'>
          <div className="icon">
               <LuHouse size='26px' color='blue' />
          </div>
          <div className="info">
            <p className='title'>Estates</p>
            <p className='big'>776</p>
            <span> <FaArrowTrendUp size='24px' /> <p>4.3%</p></span>
          </div>
        
        </div>
      </div>
     </div>
  );
};

export default DashBoard;
