import React from "react"
import { v4 as uuid } from "uuid"

import dateToString from "core/date_to_string"

import styles from "./style.scss"

const SecondStep = ({ dates, setDates, previous, submit }) => (
  <>
    <h3>Dates</h3>
    <div className={styles.inputs}>
      {dates.map((item) => (
        <div className={styles["form-group"]} key={item.id}>
          <input
            className={styles.input}
            type="date"
            value={
              item.date instanceof Date ? dateToString(item.date) : item.date
            }
            onChange={(e) =>
              setDates(
                dates.map((i) =>
                  i.id === item.id
                    ? { ...i, date: e.target.value, error: "" }
                    : i
                )
              )
            }
          />
          <button
            className={styles.button}
            onClick={() =>
              dates.length > 1
                ? setDates(dates.filter((e) => e.id !== item.id))
                : setDates(
                    dates.map((e) =>
                      e.id === item.id
                        ? {
                            ...e,
                            error: "You have to specify at least one date",
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
          setDates([...dates, { id: uuid(), date: dateToString(new Date()) }])
        }
      >
        Add Field
      </button>
      <button className={styles.button} onClick={previous}>
        Previous
      </button>
      <button className={styles.button} onClick={submit}>
        Schedule
      </button>
    </div>
  </>
)

export default SecondStep
