import React, { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

import "./style.scss"

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChange(event) {
    const value = event.target.value;
    if (event.target.name == "email")
      setEmail(value)
    else setPassword(value)
  }

  function handleSubmit() {
    event.preventDefault();
    axios.post("http://localhost:3000/api/auth/login",
      { email, password },
      {
        headers: { "Access-Control-Allow-Origin": true }
      })
      .then(res => {
        console.log("OKOKOKO")
      })
  }

  return (
    <div className="login-container">
      <h1 className="title">Login</h1>
      <div className="form-group">
        <label htmlFor="email">Email :</label>
        <input type="email" name="email" value={email} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password :</label>
        <input type="password" name="password" value={password} onChange={handleChange} required />
      </div>
      <button onClick={handleSubmit}>Login</button>

      <div className="register-link">
        <p>
          Not yet registered? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
