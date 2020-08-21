import React, { useState } from "react"
import { Link, useHistory, Redirect } from "react-router-dom"
import axios from "axios"

import "../Login/style.scss"

const Register = () => {
  const [formState, setFormState] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
  })
  const [formErrors, setFormErrors] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
  })

  const history = useHistory()

  const handleChange = (e) =>
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })

  const handleSubmit = () => {
    axios
      .post("http://localhost:3000/api/auth/register", formState)
      .then((res) => {
        history.push("/")
      })
      .catch((err) => setFormErrors(err.response.data))
  }

  return (
    <div className="login-container">
      <h1 className="title">Register</h1>
      <div className="form-group">
        <label htmlFor="name">Name :</label>
        <input
          type="text"
          name="name"
          value={formState.name}
          onChange={handleChange}
        />
        <small className="error">{formErrors.name}</small>
      </div>
      <div className="form-group">
        <label htmlFor="age">Age :</label>
        <input
          type="text"
          name="age"
          value={formState.age}
          onChange={handleChange}
        />
        <small className="error">{formErrors.age}</small>
      </div>
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
      <button onClick={handleSubmit}>Register</button>

      <div className="register-link">
        <p>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
