import React from "react"
import { Link, useHistory } from "react-router-dom"

import FoodDelivery from "assets/food-delivery.svg"

import styles from "./style.scss"

const Home = () => {
  const history = useHistory()

  return (
    <div className={styles["home-container"]}>
      <div className={styles.text}>
        <h1 className={styles.title}>Your health. Our priority.</h1>
        <p className={styles.description}>
          Our employees are commited to delivering food and medication to the
          people in need. You can join us right now.
        </p>
        <div className={styles.actions}>
          <Link className={styles.register} to="/register">
            Join us
          </Link>
          <Link className={styles.login} to="/login">
            Log in
          </Link>
        </div>
      </div>
      <img src={FoodDelivery} draggable="false" />
    </div>
  )
}

export default Home
