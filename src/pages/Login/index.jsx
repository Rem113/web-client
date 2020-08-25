import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { login } from "api/auth"

import styles from "./style.scss"

const Login = () => {
  const history = useHistory()

  useEffect(() => {
    localStorage.getItem('token') !== null ? history.push('/') : null
  }, [])

  const [formState, setFormState] = useState({ email: "", password: "" })
  const [formErrors, setFormErrors] = useState({ email: "", password: "" })

  const handleChange = (e) =>
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })

  const handleSubmit = async () => {
    try {
      const { token, name, isManager } = await login(formState)
      localStorage.setItem("token", token)
      localStorage.setItem("name", name)
      localStorage.setItem("isManager", isManager)
      history.push("/dashboard")
    } catch (err) {
      setFormErrors(err.response.data)
    }
  }

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
}

export default Login
