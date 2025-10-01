import React, { useState } from 'react';
import './CreateAccount.css';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as SVGIcon } from '../Asset/logo.svg' ;

    const CreateAccount = () => {

        const navigate = useNavigate();
        const [form, setForm] = useState({
          firstName: "",
          lastName: "",
          category: "",
          companyName: ""
        });

        const handleChange = (e) => {
          setForm({ ...form, [e.target.name]: e.target.value });
        };

        const handleNext = async (e) => {
          e.preventDefault();

          localStorage.setItem("signup-step1", JSON.stringify(form));

              navigate('/pages/CreateAccount2');
            };

  return (
    <div className='container'>
            <div className="logo">
                <SVGIcon />
            </div>
       <div className="wrapper">
            <p className="title">Create Account</p>
            <form onSubmit={handleNext}>
                <label>First Name:</label>
                <input type="text"
                 value={form.firstName}
                 name='firstName'
                  onChange={handleChange} 
                  required/>
                <label>Last Name:</label>
                <input type="text" 
                name='lastName' 
                value={form.lastName} 
                onChange={handleChange}  
                required />
                <label>Category:</label>
                <select 
                  name="category"
                  value={form.category} 
                  onChange={handleChange} 
                  required
                >
                  <option value="">-- Select Category --</option>
                  <option value="Security">Security</option>
                  <option value="Healthcare">vendor</option>
                </select>
                <label>Company Name:</label>
                <input type="text" 
                  name='companyName'
                  required 
                  value={form.companyName} 
                  onChange={handleChange}/>
                
              <button type="submit">Next</button>
            </form>
       </div>

    </div>
  )
  
}

export default CreateAccount