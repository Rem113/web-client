import React, { useState, useEffect } from "react"
import { getDeliverers, updateDeliverer } from "api/delivery"

import styles from "./style.scss"

const Deliverers = () => {
  const [deliverers, setDeliverers] = useState([])

  useEffect(() => {
    getDeliverers().then((deliverers) =>
      setDeliverers(
        deliverers.map((deliverer) => ({ ...deliverer, edited: false }))
      )
    )
  }, [])

  const handleChange = (id) => (e) => {
    const input = e.target
    !input.classList.contains(styles.edited) &&
      input.classList.add(styles.edited)

    setDeliverers(
      deliverers.map((i) =>
        i.id === id
          ? { ...i, [e.target.name]: e.target.value, edited: true }
          : i
      )
    )
  }

  const handleSubmit = async () => {
    const updated = deliverers.filter((deliverer) => deliverer.edited)
    updated.map((deliverer) => ({ ...deliverer, edited: false }))

    await Promise.all(updated.map((i) => updateDeliverer(i.id, i)))

    Array.from(document.getElementsByTagName("input")).forEach(
      (element) =>
        element.classList.contains(styles.edited) &&
        element.classList.remove(styles.edited)
    )
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Deliverers</h1>
      <div className={styles.cards}>
        {deliverers.map((deliverer) => (
          <div key={deliverer.id} className={styles.card}>
            <div className={styles["form-group"]}>
              <label>Name: </label>
              <input
                type="text"
                name="name"
                onChange={handleChange(deliverer.id)}
                value={deliverer.name}
              />
            </div>
            <div className={styles["form-group"]}>
              <label>Age: </label>
              <input
                type="number"
                name="age"
                onChange={handleChange(deliverer.id)}
                value={deliverer.age}
              />
            </div>
            <div className={styles["form-group"]}>
              <label>Email: </label>
              <input
                type="email"
                name="email"
                onChange={handleChange(deliverer.id)}
                value={deliverer.email}
              />
            </div>
          </div>
        ))}
      </div>
      {deliverers.length > 0 && (
        <button onClick={handleSubmit}>Save Changes</button>
      )}
      {deliverers.length == 0 && <h2>There are no available deliverers</h2>}
    </div>
  )
}

export default Deliverers
