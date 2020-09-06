import React, { useState, useEffect } from "react"

import MapView from "components/MapView"

import {
  getDeliveriesForToday,
  getDeliveriesForDeliverer,
  markDeliveryAsDone,
} from "api/delivery"

import styles from "./style.scss"

const Deliveries = () => {
  const [deliveries, setDeliveries] = useState([])

  const manager = sessionStorage.getItem("manager") === "true"
  const userId = sessionStorage.getItem("id")

  useEffect(() => {
    if (manager)
      getDeliveriesForToday().then((deliveries) => setDeliveries(deliveries))
    else
      getDeliveriesForDeliverer(userId).then((deliveries) =>
        setDeliveries(deliveries)
      )
  }, [])

  const handleMarkerClick = async (id) => {
    if (confirm("Is the delivery done?")) {
      await markDeliveryAsDone(id)
      setDeliveries(deliveries.filter((d) => d.id !== id))
    }
  }

  return (
    <>
      <h3>Deliveries</h3>
      {deliveries.length === 0 ? (
        <p>You have no delivery for today</p>
      ) : (
        <MapView deliveries={deliveries} onMarkerClick={handleMarkerClick} />
      )}
    </>
  )
}

export default Deliveries
