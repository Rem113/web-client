import React, { useState } from "react"
import { Link, useHistory, Redirect } from "react-router-dom"
import axios from "axios"

import styles from "./style.scss"

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

  const checkAccessUser = () => localStorage.getItem("token") === null

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

  if (!checkAccessUser()) history.push("/")
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Register</h1>
      <div className={styles["form-group"]}>
        <label htmlFor="name">Name :</label>
        <input
          type="text"
          name="name"
          value={formState.name}
          onChange={handleChange}
        />
        <small className={styles.error}>{formErrors.name}</small>
      </div>
      <div className={styles["form-group"]}>
        <label htmlFor="age">Age :</label>
        <input
          type="text"
          name="age"
          value={formState.age}
          onChange={handleChange}
        />
        <small className={styles.error}>{formErrors.age}</small>
      </div>
      <div className={styles["form-group"]}>
        <label htmlFor="email">Email :</label>
        <input
          type="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
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
      <button onClick={handleSubmit}>Register</button>

      <div className={styles.link}>
        <p>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
