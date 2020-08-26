import React from "react"

import styles from "./style.scss"

const ScheduleDelivery = () => (
  <div className={styles.container}>
    <h1>Schedule a delivery</h1>
    <div className={styles["form-group"]}>
      <label htmlFor="address">Address :</label>
      <input type="text" name="address" />
      <small className={styles.error}></small>
    </div>
  </div>
)

export default ScheduleDelivery
