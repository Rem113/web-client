import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import axios from "axios"

import styles from "./style.scss"

const Deliverers = () => {
  const [deliverers, setDeliverers] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/auth/deliverers")
      .then((res) => setDeliverers(res.data))
  }, [])

  const handleChange = (e) => {
    const [name, id] = e.target.name.split(" ")

    console.log(e.target)
    deliverers[id][e.target.name] = e.target.value

    setDeliverers(newDeliverers)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Delivers</h1>
      <div className={styles["form-group"]}>
        {deliverers.map((deliverer, i) => (
          <div key={i}>
            <input
              type="text"
              name={"name " + i}
              onChange={handleChange}
              value={deliverer.name}
            />
            <input
              type="text"
              name={"age " + i}
              onChange={handleChange}
              value={deliverer.age}
            />
            <input
              type="text"
              name={"email " + i}
              onChange={handleChange}
              value={deliverer.email}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Deliverers
