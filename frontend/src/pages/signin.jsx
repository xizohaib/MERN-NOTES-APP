import "./signin.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async (e) => {
    if (!password || !email) return alert("Fiels are empty");
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/signin", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Logged in successfully");
      navigate("/notesdashboard");
    } catch (err) {
      return alert(err.response?.data?.msg || "Signin Failed");
    }
  };

  return (
    <div className="signin-wrapper">
      <div className="signin-container">
        <form className="signin-form" onSubmit={handleSignin}>
          <h2 className="signin-title">Welcome Back</h2>
          <p className="signin-subtitle">Please enter your details</p>

          <input
            className="input-field"
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="input-field"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="signin-btn">Login</button>

          <div className="form-footer">
            <span>Don't have an account? </span>
            <a href="/signup">Sign up for free</a>
          </div>
        </form>
      </div>
    </div>
  );
}
