import React, { useState } from "react"
import { Link, useHistory, Redirect } from "react-router-dom"
import axios from "axios"

import styles from "./style.scss"

const WritePost = () => {
  const [formState, setFormState] = useState({
    title: "",
    content: "",
    author: sessionStorage.getItem("name"),
  })
  const [formErrors, setFormErrors] = useState({ title: "", content: "" })

  const history = useHistory()

  function checkAccessUser() {
    if (sessionStorage.getItem("token") === null) return false
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
      <div className={styles.container}>
        <h1 className={styles.title}>Write a blog post: </h1>
        <div className={styles["form-group"]}>
          <label htmlFor="title">Title :</label>
          <input
            type="text"
            name="title"
            value={formState.title}
            onChange={handleChange}
            autoComplete="off"
          />
          <small className={styles.error}>{formErrors.title}</small>
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="content">Content :</label>
          <textarea
            type="text"
            name="content"
            value={formState.content}
            onChange={handleChange}
            rows="5"
          />
          <small className={styles.error}>{formErrors.content}</small>
        </div>
        <button className="button" onClick={handleSubmit}>
          Post
        </button>
      </div>
    )
  else return <Redirect to="/" />
}

export default WritePost
