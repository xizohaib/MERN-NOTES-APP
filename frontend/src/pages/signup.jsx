import { useState } from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password != verifyPassword) return alert("passwords doesnot match");
    try {
      await axios.post(`http://localhost:5000/signup`, {
        name,
        email,
        password,
      });

      alert("Account created Successfully!");
      navigate("/");
    } catch (err) {
      return alert(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="form-container">
        <form className="signup-form" onSubmit={handleSignup}>
          <h2 className="form-title">Create Account</h2>

          <input
            className="input-field"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="input-field"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="input-field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            className="input-field"
            type="password"
            placeholder="Verify password"
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
          />

          <button className="submit-btn" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
