import React, { useState } from "react";
import "./CreateAccount.css";
import { ReactComponent as SVGIcon } from '../Asset/logo.svg' ;
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PiEyeSlashThin, PiEyeThin } from "react-icons/pi";


const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[0-9]/, "Password must contain a number"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const CreateAccount2 = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });


  const onSubmit = async (data) => {
    const step1 = JSON.parse(localStorage.getItem("signup-step1"));

    const userData = {
      ...step1,
      ...data,
    };

    try {
      const res = await fetch("https://oneturfapi.makarioworks.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (res.ok) {
        alert("Account created! Now login.");
        localStorage.removeItem("signup-step1");
        navigate("/pages/VerifyAccount");
      } else {
        alert("Failed to create account");
      }
    } catch (err) {
      console.error(err);
      alert("Server error, please try again.");
    }

  };

  return (
    <div className="container">
      <div className="logo">
        <SVGIcon />
      </div>
      <div className="wrapper">
        <p className="title">Create Account</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Email Address:</label>
          <input type="email" {...register("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="error">{errors.email?.message}</p>
          <label>Phone number:</label>
          <PhoneInput
            country={"ng"}
            value={phone}
            onChange={(val) => {
              setPhone(val)
              setValue("phone", val)
            }}
            inputProps={{ name: "phone", required: true }}
            countryCodeEditable={false}            
            placeholder="+234 801 234 5678" 

          />
          <p className="error">{errors.phone?.message}</p>
          <label>Password:</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="toggle-eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ?   <PiEyeThin size={22} /> :<PiEyeSlashThin size={22} />}
            </span>
          </div>
          <p className="error">{errors.password?.message}</p>
          <label>Confirm Password:</label>
          <div className="password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
              className="toggle-eye"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <PiEyeThin size={22} /> :<PiEyeSlashThin size={22} />}
            </span>
          </div>
          <p className="error">{errors.confirmPassword?.message}</p>

          <button type="submit">Create Account</button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount2;
