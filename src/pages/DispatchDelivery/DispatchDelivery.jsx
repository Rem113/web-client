import React, { useState, useEffect } from "react"

import {
  getDeliverers,
  getDeliveriesForToday,
  dispatchDeliveries,
} from "api/delivery"

import styles from "./style.scss"
import { useHistory } from "react-router-dom"

const DispatchDelivery = () => {
  const [deliverers, setDeliverers] = useState([])
  const [deliveries, setDeliveries] = useState([])
  const [loadingDeliveries, setLoadingDeliveries] = useState(true)

  const history = useHistory()

  useEffect(() => {
    getDeliverers().then((deliverers) =>
      setDeliverers(deliverers.map((d) => ({ ...d, checked: false })))
    )
  }, [])

  useEffect(() => {
    getDeliveriesForToday().then((deliveries) => {
      setDeliveries(deliveries)
      setLoadingDeliveries(false)
    })
  }, [])

  const handleCheck = (id) => () => {
    setDeliverers(
      deliverers.map((d) => (d.id === id ? { ...d, checked: !d.checked } : d))
    )
  }

  const dispatch = () => {
    const selected = deliverers.filter((d) => d.checked)

    if (selected.length === 0) {
      alert("Please select at least one deliverer")
      return
    }

    if (selected.length > deliveries.length) {
      alert(
        `There are ${deliveries.length} deliveries for today, but you selected ${selected.length} deliverers`
      )
      return
    }

    // Dispatch
    dispatchDeliveries(selected.map((d) => d.id)).then(() =>
      history.push("/dashboard")
    )
  }

  if (loadingDeliveries) return <p>Loading...</p>

  return (
    <div className={styles.container}>
      <h1>Dispatch deliveries</h1>
      {deliveries.length === 0 ? (
        <h3>No deliveries for today</h3>
      ) : (
        <>
          <h3>There are {deliveries.length} deliveries for today</h3>
          {deliverers.map((d) => (
            <div key={d.id}>
              <input
                type="checkbox"
                id={d.id}
                checked={d.checked}
                onChange={handleCheck(d.id)}
              />
              <label htmlFor={d.id}>{d.name}</label>
            </div>
          ))}
        </>
      )}
      <button onClick={dispatch}>Dispatch</button>
    </div>
  )
}

export default DispatchDelivery
