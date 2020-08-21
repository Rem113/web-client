import React, { useState } from "react"
import { Link, useHistory, Redirect } from "react-router-dom"
import axios from "axios"

import "./style.scss"

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" })
  const [formErrors, setFormErrors] = useState({ email: "", password: "" })

  const history = useHistory()

  const handleChange = (e) =>
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })

  const handleSubmit = () =>
    axios
      .post("http://localhost:3000/api/auth/login", formState)
      .then((res) => {
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("name", res.data.name)
        history.push("/")
      })
      .catch((err) => setFormErrors(err.response.data))

  return (
    <div className="login-container">
      <h1 className="title">Login</h1>
      <div className="form-group">
        <label htmlFor="email">Email :</label>
        <input
          type="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          required
        />
        <small className="error">{formErrors.email}</small>
      </div>
      <div className="form-group">
        <label htmlFor="password">Password :</label>
        <input
          type="password"
          name="password"
          value={formState.password}
          onChange={handleChange}
          required
        />
        <small className="error">{formErrors.password}</small>
      </div>
      <button onClick={handleSubmit}>Login</button>
      <div className="register-link">
        <p>
          Not yet registered? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
