import React from "react"
import { v4 as uuid } from "uuid"

import styles from "./style.scss"

const FirstStep = ({ addresses, setAddresses, submit }) => (
  <>
    <h3>Addresses</h3>
    <div className={styles.inputs}>
      {addresses.map((item) => (
        <div className={styles["form-group"]} key={item.id}>
          <input
            className={styles.input}
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
            className={styles.button}
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
        className={styles.button}
        onClick={() =>
          setAddresses([...addresses, { id: uuid(), address: "" }])
        }
      >
        Add Field
      </button>
      <button className={styles.button} onClick={submit}>
        Next
      </button>
    </div>
  </>
)

export default FirstStep
