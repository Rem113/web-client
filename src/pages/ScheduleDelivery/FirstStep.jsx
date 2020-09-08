import React from "react"
import { v4 as uuid } from "uuid"

import styles from "./style.scss"

const FirstStep = ({
  food,
  setFood,
  medicine,
  setMedicine,
  checkboxesError,
  setCheckboxesError,
  addresses,
  setAddresses,
  submit,
}) => (
    <>
      <h2>Addresses</h2>
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
        <div className={styles["form-group"]}>
          <input
            name="food"
            type="checkbox"
            checked={food}
            onChange={(e) => {
              setFood(e.target.checked)
              setCheckboxesError("")
            }}
          />
          <label htmlFor="food">Food</label>
        </div>
        <div className={styles["form-group"]}>
          <input
            name="medicine"
            type="checkbox"
            checked={medicine}
            onChange={(e) => {
              setMedicine(e.target.checked)
              setCheckboxesError("")
            }}
          />
          <label htmlFor="medicine">Medicine</label>
          <br />
          <small className={styles.error}>{checkboxesError}</small>
        </div>
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
