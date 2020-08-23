import React, { useState } from "react"
import { Link, useHistory, Redirect } from "react-router-dom"
import axios from "axios"

import "./style.scss"

const Login = () => {
  const [formState, setFormState] = useState({ title: "", content: "" })
  const [formErrors, setFormErrors] = useState({ title: "", content: "" })

  const history = useHistory()

  function checkAccessUser() {
    if (localStorage.getItem("token") === null)
      return false
    else return true
  }

  const handleChange = (e) =>
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })


  const handleSubmit = () =>
    axios
      .post("http://localhost:3000/api/post", formState)
      .then((res) => {
        history.push("/blog")
      })
      .catch((err) => setFormErrors(err.response.data))

  if (checkAccessUser())
    return (
      <div className="login-container">
        <h1 className="title">Add A New Subject</h1>
        <div className="form-group">
          <label htmlFor="title">Title :</label>
          <input
            type="text"
            name="title"
            value={formState.title}
            onChange={handleChange}
          />
          <small className="error">{formErrors.title}</small>
        </div>
        <div className="form-group">
          <label htmlFor="content">Content :</label>
          <textarea
            type="text"
            name="content"
            value={formState.content}
            onChange={handleChange}
            rows="5"
          />
          <small className="error">{formErrors.content}</small>
        </div>
        <button onClick={handleSubmit}>Post</button>
      </div>
    )
  else
    return <Redirect to="/" />
}

export default Login
