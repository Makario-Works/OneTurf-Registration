import React, { useState } from "react";
import "./Styles/Marketplace.css";
import { FaBoxOpen, FaTools, FaUser } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { SlUserUnfollow } from "react-icons/sl";

const vendors = [
  { name: "Lola Famous", store: "L & F Enterprise", category: "Service provider", rating: 4.5 },
  { name: "Deborah Paul", store: "D & P Incorporated", category: "Product provider", rating: 2.5 },
  { name: "John Doe", store: "John Pharmacy", category: "Service provider", rating: 5.1 },
];




const Marketplace = () => {
  const [selectedVendor, setSelectedVendor] = useState(null);

  return (
     
    <div className="marketplace">
       {!selectedVendor ? (
        <>
      <h1 className="page-title">Marketplace</h1>

     
      <div className="stats-container">
        <div className="stat-card">
           <div className="stat-icon">
            <HiUsers className='s-icon' style= {{ background: '#E8F0FF', color:'#1769FF' }}/>
          </div> 
          <div className="stat-info">
             <p>Vendors</p>
             <h2>732</h2>
          </div>
         
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaBoxOpen className='s-icon' style= {{ background:'#DDF6EA' , color:'#43CD8B'    }}/>
          </div> 
          <div className="stat-info">
            <p>Product providers</p>
            <h2>434</h2>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <FaTools className='s-icon' style= {{ background: '#FFF1EC', color:'#FFA27D' }} />
          </div> 
          <div className="stat-info">
          <p>Service providers</p>
          <h2>391</h2>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <SlUserUnfollow className='s-icon' style= {{ background:'#F3F3F3' , color: '#020202 '  }}/>
          </div> 
          <div className="stat-info">
          <p>Blacklist</p>
          <h2>22</h2>
          </div>
          
        </div>
      </div>

      
      <div className="table-wrapper">
        <table className="vendors-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Store name</th>
              <th>Category</th>
              <th>Rating</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor, index) => (
              <tr key={index}>
                <td>{vendor.name}</td>
                <td>{vendor.store}</td>
                <td>{vendor.category}</td>
                <td className="rating-cell">
                  <span className="rating-number">{vendor.rating}</span>
                  <span className="rating-star">★</span>
                </td>
                <td>
                  <button className="btn-view" onClick={() => setSelectedVendor(vendor)}>View more</button>
                  <button className="btn-blacklist">Blacklist</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </>
      ) : (
    <div className="vendor-details">
          <button className="back-btn" onClick={() => setSelectedVendor(null)}>← Back</button>
          <h2>Vendor’s details</h2>

          <div className="vendor-card">
            <div className="vendor-avatar"><FaUser /></div>
            <div className="vendor-card-info">
              <h3>{selectedVendor.name}</h3>
              <p>{selectedVendor.store}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Marketplace;
