import React, { useState } from "react"
import { Link, useHistory, Redirect } from "react-router-dom"
import axios from "axios"

import styles from "./style.scss"

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" })
  const [formErrors, setFormErrors] = useState({ email: "", password: "" })

  const history = useHistory()

  const checkAccessUser = () => localStorage.getItem("token") === null

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

  if (checkAccessUser())
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Login</h1>
        <div className={styles["form-group"]}>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <small className={styles.error}>{formErrors.email}</small>
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="password">Password :</label>
          <input
            type="password"
            name="password"
            value={formState.password}
            onChange={handleChange}
            required
          />
          <small className={styles.error}>{formErrors.password}</small>
        </div>
        <button onClick={handleSubmit}>Login</button>
        <div className={styles.link}>
          <p>
            Not yet registered? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
    )
  else return <Redirect to="/" />
}

export default Login
