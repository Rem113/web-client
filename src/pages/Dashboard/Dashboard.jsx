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
        <div className={styles.actions}>
          <Link to="/delivery/schedule" className={styles.button}>
            Schedule a delivery
          </Link>
          <Link to="/delivery/dispatch" className={styles.button}>
            Dispatch deliveries
          </Link>
          <Link to="/delivery/diagrams" className={styles.button}>
            Show Diagrams
          </Link>
        </div>
      )}
    </div>
  )
}

export default Dashboard
