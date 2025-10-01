import React, { useState }  from 'react'

import './CreateAccount.css';
import { ReactComponent as SVGIcon } from '../Asset/logo.svg' ;
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // const onSubmit = /*async (data)*/ (e) => {
  //   setLoading(true);

  //    try {
  //     const res = await fetch("https://oneturfapi.makarioworks.com/", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(data),
  //     });

  //     if (res.ok) {
  //       const result = await res.json();
  //       localStorage.setItem("token", result.token);

  //       alert("Login successful!");
  //       navigate("/pages/Admin/Dashboard");
  //     } else {
  //       alert("Invalid email or password");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     alert("Server error, please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
       const onSubmit = async (data) => {
          
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedUser && savedUser.email === email && savedUser.password === password) {
      alert("Login successful 🎉");
      navigate("pages/Admin/AdminLayout");// or any protected route
    } else {
      alert("Invalid email or password");
    }

  };



  return (
     <div className='container'>
            <div className="logo">
                <SVGIcon />
            </div>
       <div className="wrapper">
            <h3 className="title">Log in</h3>
            <form  onSubmit={handleSubmit(onSubmit)}>
                
                <label>Email:</label>
                {/* <input type="email" {...register("email")}  placeholder ='sample@oneturf.com' /> */}
                 <input type="email" {...register("email")} value={email} onChange={(e) => setEmail(e.target.value)} required />
                <p className="error">{errors.email?.message}</p>


                <label>Password:</label>
                {/* <input
                type="password" {...register("password")}
                /> */}
                <input type="password" {...register("password")} value={password} onChange={(e) => setPassword(e.target.value)} required />
                 {/* <p className="error">{errors.password?.message}</p>
                 <button type="submit" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </button> */}
                 <button type="submit">Login</button>
                 <Link to="/pages/CreateAccount">Sign Up </Link>
            </form>

        </div>
    </div>
  )
}

export default Login