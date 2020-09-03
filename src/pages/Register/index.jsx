import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { register } from "api/auth"

import styles from "./style.scss"

const Register = () => {
  const history = useHistory()

  useEffect(() => {
    sessionStorage.getItem("token") !== null ? history.push("/") : null
  }, [])

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

  const handleChange = (e) =>
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })

  const handleSubmit = async () => {
    try {
      /*var a = */ await register(formState)
      // console.log(a)
      // sessionStorage.setItem("token", token)
      // sessionStorage.setItem("name", name)
      // sessionStorage.setItem("manager", manager)
      history.push("/")
    } catch (err) {
      setFormErrors(err.response.data)
    }
  }

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
          autoComplete="off"
        />
        <small className={styles.error}>{formErrors.name}</small>
      </div>
      <div className={styles["form-group"]}>
        <label htmlFor="age">Age :</label>
        <input
          type="number"
          name="age"
          value={formState.age}
          onChange={handleChange}
          autoComplete="off"
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
