import React, { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import nrtImage from "../../Asset/nrt.png";
import house from "../../Asset/house.png"; 
import { ImLocation } from "react-icons/im";
import { FaUserFriends } from "react-icons/fa";
import { HiMiniHome } from "react-icons/hi2";
import { FaArrowTrendUp  } from "react-icons/fa6";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import "./Estate.css";



const Estate = () => {
  // const [estates, setEstates] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuccess, setShowSuccess] = useState(false); 
  const [formData, setFormData] = useState({  name: "", country: "", state: "", lga: "", fullname:"", recipientemail:"", image: ""  });

const [estates, setEstates] = useState(() => {
  // Load estates from localStorage on first render
  const saved = localStorage.getItem("estates");
  return saved ? JSON.parse(saved) : [];
});
// Save estates to localStorage whenever they change
useEffect(() => {
  localStorage.setItem("estates", JSON.stringify(estates));
}, [estates]);
  
  // store previous values
  const totalEstates = estates.length;
  const totalHouses = estates.reduce((sum, e) => sum + Number(e.houses), 0);
  const totalResidents = estates.reduce((sum, e) => sum + Number(e.residents), 0);

  const handleSubmit = (e) => {
    e.preventDefault();

  const newEstate = {
    ...formData,
    id: Date.now(),
    image: formData.image || house,
  };

  setEstates([...estates, newEstate]);
  setFormData({ name: "", country: "", state: "", lga: "", fullname:"", recipientemail:"", image: "" });
  setShowForm(false);
  setShowSuccess(true);
};


const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    setFormData({ ...formData, image: URL.createObjectURL(file) });
  }
};

  const filteredEstates = estates.filter(
    (estate) =>
      estate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      estate.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="estate-container">
      <h2>Estates</h2>
      <div className="estate-cards">
        <div className="total card">
          <p className="title">Total Estates</p>
          <p className="num">{totalEstates}</p>
          <span className="success"><FaArrowTrendUp />  {(totalEstates * 1).toFixed(2)}%</span>
        </div>
        <div className="houses card">
          <p className="title">Houses</p>
          <p className="num">{totalHouses || 0}</p>
          
        </div>
        <div className="residents card">
          <p className="title">Residents</p>
          <p className="num">{totalResidents || 0}</p>
          <span className="success"><FaArrowTrendUp />  {(totalResidents * 0.2).toFixed(2)}%</span>
        </div>
      </div>

      <div className="estate-list">
        <div className="estate-middle-item">
          <h2>All estates</h2>
          <input
            type="text"
            className="search-bar"
            placeholder="Search Estates"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {estates.length === 0 ? (
          <div className="empty-state">
            <img src={nrtImage} alt="no estate" />
            <p>No estates available</p>
            <button onClick={() => setShowForm(true)}>Add estate</button>
          </div>
        ) : (
          <div className="estate-grid">
            <div className="add-estate-card" onClick={() => setShowForm(true)}>
              <span><FiPlus size='24px' /></span>
              <p>Add new estate</p>
            </div>
            {filteredEstates.map((estate) => (
            <div key={estate.id} className="estate-card">
            <img src={estate.image || house} alt="estate" className="estate-image" />

            <div className="estate-content">
              <h4 className="estate-name">{estate.name}</h4>
              <div className="estate-tags">
                <span className="tag location"> <ImLocation />{estate.country}</span>
                <span className="tag"><HiMiniHome /> {estate.houses || 0}</span>
                <span className="tag"><FaUserFriends /> {estate.residents || 0}</span>
              </div>
              <a href="#" className="learn-more">Learn More ▶ </a>
            </div>
          </div>
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Estate</h3>
           <form onSubmit={handleSubmit}>
              <label>Estate Name:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <label>Country:</label>
              <select
                value={formData.country || ""}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                required
              >
                <option value="">Select Country</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Ghana">Ghana</option>
                <option value="Kenya">Kenya</option>
                <option value="South Africa">South Africa</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
              </select>
              <div className="state-info">
                <div className="info-row">
                   <label>State:</label>
                    <input
                      type="text"
                      placeholder=""
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    />
                </div>
                <div className="info-row">
                      <label>LGA:</label>
                      <input
                        type="text"
                        value={formData.lga}
                        onChange={(e) => setFormData({ ...formData, lga: e.target.value })}
                      />
                </div>
                
              </div>
               <label>Full Name:</label>
              <input
                type="text"
                value={formData.fullname}
                onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
              />
               <label>Recipient Email:</label>
              <input
                type="email"
                value={formData.recipientemail}
                onChange={(e) => setFormData({ ...formData, recipientemail: e.target.value })}
              />
            
              {/* <input
                type="number"
                placeholder="Number of Residents"
                value={formData.residents}
                onChange={(e) => setFormData({ ...formData, residents: e.target.value })}
              /> */}
i
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />

              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  style={{ width: "100%", height: "100px", objectFit: "cover", marginTop: "10px", borderRadius: "6px" }}
                />
              )}

              <button type="submit">Add Estate</button>
            
            </form>

          </div>
        </div>
      )}

      {showSuccess && (
        <div className="modal">
          <div className="modal-content success">
            <div className="checkmark"><IoCheckmarkCircleOutline /></div>
            <p>Your invitation has been successfully sent</p>
            <button onClick={() => setShowSuccess(false)}>Great</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Estate;
