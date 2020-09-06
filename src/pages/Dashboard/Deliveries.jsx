import React, { useState, useEffect } from "react"

import MapView from "components/MapView"

import { getDeliveriesForDeliverer } from "api/delivery"

import styles from "./style.scss"

const Deliveries = () => {
  const [deliveries, setDeliveries] = useState([])

  const userId = sessionStorage.getItem("id")

  useEffect(() => {
    getDeliveriesForDeliverer(userId).then((deliveries) =>
      setDeliveries(deliveries)
    )
  }, [])

  return (
    <>
      <h3>Deliveries</h3>
      {deliveries.length === 0 ? (
        <p>You have no delivery for today</p>
      ) : (
        <MapView
          markers={deliveries.map((d) => [d.address.lat, d.address.lon])}
        />
      )}
    </>
  )
}

export default Deliveries
