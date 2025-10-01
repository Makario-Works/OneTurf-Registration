import React from 'react';
import './CreateAccount.css';
import logo from '../Asset/logo.png';
import { Link } from 'react-router-dom';
import { ReactComponent as SVGIcon } from '../Asset/logo2.svg' ;



export const VerifyAccount = () => {

  return (
    <div className='container'>
            <div className="logo">
               
                <img src={logo}  alt="logo" />
            </div>
       <div className="wrapper">
            <div className="logo2">
                 <SVGIcon />
            </div>
            <h3 className="title">Verify email</h3>
            <p className='description'> A verification link has been sent to <span>johndoe@gmail.com</span>  <br /><br /> Please click the link to verify your account.</p>
            <Link style={{ textDecoration: 'none'}} to= "/" ><button>Log in</button> </Link>
        </div>
    </div>
  )
}

export default VerifyAccount 