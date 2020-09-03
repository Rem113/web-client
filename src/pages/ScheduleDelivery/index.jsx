import React, { useState } from "react"
import { v4 as uuid } from "uuid"

import styles from "./style.scss"

const ScheduleDelivery = () => {
  const [addresses, setAddresses] = useState([
    { id: uuid(), address: "", error: "" },
  ])

  const submit = () => {
    const fieldsAreFilled = addresses.every((e) => e.address.trim().length > 0)

    if (!fieldsAreFilled) {
      setAddresses(
        addresses.map((e) =>
          e.address.trim().length > 0
            ? e
            : { ...e, error: "Please fill this field or delete it" }
        )
      )
    }

    console.log(addresses.map((a) => a.address))
  }

  return (
    <div className={styles.container}>
      <h1>Schedule a delivery</h1>
      <h3>Addresses</h3>
      <div className={styles.inputs}>
        {addresses.map((item) => (
          <div className={styles["form-group"]} key={item.id}>
            <input
              type="text"
              value={item.address}
              onChange={(e) =>
                setAddresses(
                  addresses.map((i) =>
                    i.id === item.id
                      ? { ...i, address: e.target.value, error: "" }
                      : i
                  )
                )
              }
            />
            <button
              onClick={() =>
                addresses.length > 1
                  ? setAddresses(addresses.filter((e) => e.id !== item.id))
                  : setAddresses(
                      addresses.map((e) =>
                        e.id === item.id
                          ? {
                              ...e,
                              error: "You have to specify at least one address",
                            }
                          : e
                      )
                    )
              }
            >
              &#x2A09;
            </button>
            <small className={styles.error}>{item.error}</small>
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <button
          onClick={() =>
            setAddresses([...addresses, { id: uuid(), address: "" }])
          }
        >
          Add Field
        </button>
        <button onClick={submit}>Submit</button>
      </div>
    </div>
  )
}

export default ScheduleDelivery
