import React from "react"
import { Link } from "react-router-dom"

import Deliveries from "./Deliveries"

import styles from "./style.scss"

const Dashboard = () => {
  const manager = sessionStorage.getItem("manager") === "true"

  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      <Deliveries />
      {manager && (
        <Link to="/delivery/schedule" className={styles.button}>
          Schedule a delivery
        </Link>
      )}
    </div>
  )
}

export default Dashboard
