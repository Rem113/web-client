import React from "react"
import { Link } from "react-router-dom"

import styles from "./style.scss"

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      <Link to="/delivery/schedule" className={styles.button}>
        Schedule a delivery
      </Link>
    </div>
  )
}

export default Dashboard
