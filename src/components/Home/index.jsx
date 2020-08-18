import React from "react"
import { Link } from "react-router-dom"
import FoodDelivery from "assets/food-delivery.svg"

import "./style.scss"

export default () => (
  <div className="home-container">
    <div className="text">
      <h1 className="title">Your health. Our priority.</h1>
      <p className="description">
        Our employees are commited to delivering food and medication to the
        people in need. You can join us right now.
      </p>
      <div className="actions">
        <Link className="register" to="/register">
          Join us
        </Link>
        <Link className="login" to="/login">
          Log in
        </Link>
      </div>
    </div>
    <img src={FoodDelivery} />
  </div>
)
