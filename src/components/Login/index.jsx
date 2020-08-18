import React from "react"
import { Link } from "react-router-dom"

import "./style.scss"

export default () => (
  <div className="login-container">
    <h1 className="title">Login</h1>
    <div className="form-group">
      <label htmlFor="email">Email :</label>
      <input type="text" name="email" />
    </div>
    <div className="form-group">
      <label htmlFor="password">Password :</label>
      <input type="text" name="password" />
    </div>
    <button>Login</button>
    <div className="register-link">
      <p>
        Not yet registered? <Link to="/register">Sign up</Link>
      </p>
    </div>
  </div>
)
