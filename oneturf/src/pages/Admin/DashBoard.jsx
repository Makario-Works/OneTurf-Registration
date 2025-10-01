import React, { useState } from 'react';
import { LuHouse } from "react-icons/lu";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { HiOutlineUsers } from "react-icons/hi2";
import './Styles/DashBoard.css';
import Reviews from "./Reviews";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const initialData = [
  { day: "Mon", revenue: 5000000 },
  { day: "Tues", revenue: 18000000 },
  { day: "Wed", revenue: 9500000 },
  { day: "Thur", revenue: 21000000 },
  { day: "Fri", revenue: 24721930 },
  { day: "Sat", revenue: 15000000 },
  { day: "Sun", revenue: 7000000 },
];

const DashBoard = () => {
  const [revenue, setRevenue] = useState(20345904.03);
  const [previousRevenue, setPreviousRevenue] = useState(15123450.12);
  const [users, setUsers] = useState(758291);
  const [previousUsers, setPreviousUsers] = useState(804000);
  const [estates, setEstates] = useState(776);
  const [previousEstates, setPreviousEstates] = useState(743);
  const [estateRequests, setEstateRequests] = useState([
    {
      id: 1,
      name: "Oral Estate",
      address: "Onigbongbo Community, Lekki Ajah Expressway, Lagos",
    },
    {
      id: 2,
      name: "Ogbonbo Estate",
      address: "Onigbongbo Community, Lekki Ajah Expressway, Lagos",
    },
  ]);
  const handleAccept = (id) => {
    setEstates(estates + 1); 
    setEstateRequests(estateRequests.filter((estate) => estate.id !== id));
  };

  const handleDelete = (id) => {
    setEstateRequests(estateRequests.filter((estate) => estate.id !== id));
  };
  const calcGrowth = (current, previous) => {
    if (previous === 0) return 0;
    return (((current - previous) / previous) * 100).toFixed(1);
  };

  return (
    <div className='dashboard'>
      <div className="left-dashboard">
        <h2>Dashboard</h2>
        <div className="dashboard-cards">
          <div className='revenue card'>
            <p>Revenue</p>
            <p className='num'>₦{revenue.toLocaleString()}</p>
            <span>
              {calcGrowth(revenue, previousRevenue) >= 0 ? (
                <>
                  <FaArrowTrendUp color="green" />
                  <p>{calcGrowth(revenue, previousRevenue)}%</p>
                </>
              ) : (
                <>
                  <FaArrowTrendDown color="red" />
                  <p>{calcGrowth(revenue, previousRevenue)}%</p>
                </>
              )}
            </span>
          </div>
          <div className='users card'>
            <div className="icon">
              <HiOutlineUsers size='26px' color='blue' />
            </div>
            <div className="info">
              <p className='title'>Users</p>
              <p className='num'>{users.toLocaleString()}</p>
              <span>
                {calcGrowth(users, previousUsers) >= 0 ? (
                  <>
                    <FaArrowTrendUp color="green" />
                    <p>{calcGrowth(users, previousUsers)}%</p>
                  </>
                ) : (
                  <>
                    <FaArrowTrendDown color="red" />
                    <p>{calcGrowth(users, previousUsers)}%</p>
                  </>
                )}
              </span>
            </div>
          </div>
          <div className='estate card'>
            <div className="icon">
              <LuHouse size='26px' color='blue' />
            </div>
            <div className="info">
              <p className='title'>Estates</p>
              <p className='num'>{estates}</p>
              <span>
                {calcGrowth(estates, previousEstates) >= 0 ? (
                  <>
                    <FaArrowTrendUp color="green" />
                    <p>{calcGrowth(estates, previousEstates)}%</p>
                  </>
                ) : (
                  <>
                    <FaArrowTrendDown color="red" />
                    <p>{calcGrowth(estates, previousEstates)}%</p>
                  </>
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="chart-card">
          <h3>Revenue this week</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart margin={{ top: 20, right: 30, left: 40, bottom: 20 }} data={initialData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d6efd" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#0d6efd" stopOpacity={0.05} />
                </linearGradient>
              </defs>

              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(value) => value.toLocaleString()} axisLine={false} tickLine={false} />
               <Tooltip
            formatter={(value) => value.toLocaleString()}
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              border: "none",
              padding: "8px 12px",
            }}
            itemStyle={{
              color: "#0d6efd",
              fontWeight: 500,
            }}
            labelStyle={{
              color: "#333",
              fontWeight: "bold",
              marginBottom: "4px",
            }}
          />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#0d6efd"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRevenue)"
                activeDot={{ r: 7 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="new-estate-signup">
          <h3>New Estate Sign ups</h3>
          <div className="new-estate-signup-cards">
            {estateRequests.length === 0 ? (
              <p>No new requests</p>
            ) : (
              estateRequests.map((estate) => (
                <div key={estate.id} className="new-estate-signup-card">
                  <div className="description">
                    <h4>{estate.name}</h4>
                    <p className="address">{estate.address}</p>
                  </div>
                  <div className="button">
                    <button className='accept' onClick={() => handleAccept(estate.id)}>Accept</button>
                    <button className='delete' onClick={() => handleDelete(estate.id)}>Delete</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="right-panel">
        <Reviews />
      </div>
    </div>
  );
};

export default DashBoard;
