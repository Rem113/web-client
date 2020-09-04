import React, { useState } from "react"
import { v4 as uuid } from "uuid"

import dateToString from "core/date_to_string"
import removeDuplicates from "core/remove_duplicates"

import FirstStep from "./FirstStep"
import SecondStep from "./SecondStep"

import styles from "./style.scss"

const ScheduleDelivery = () => {
  const [step, setStep] = useState(1)

  const [addresses, setAddresses] = useState([
    {
      id: uuid(),
      address: "",
      error: "",
    },
  ])
  const [dates, setDates] = useState([
    { id: uuid(), date: dateToString(new Date()) },
  ])

  const submitFirstStep = () => {
    if (addresses.some((a) => a.address.trim().length === 0))
      setAddresses(
        addresses.map((e) =>
          e.address.trim().length > 0
            ? e
            : { ...e, error: "Please fill this field or delete it" }
        )
      )
    else setStep(2)
  }

  const submitSecondStep = () => {
    const today = new Date().setHours(0, 0, 0, 0)

    if (dates.some((d) => new Date(d.date).getTime() < today)) {
      setDates(
        dates.map((d) =>
          new Date(d.date).getTime() < today
            ? { ...d, error: "Date must be before today" }
            : d
        )
      )
      return
    }

    const data = {
      addresses: removeDuplicates(addresses.map((a) => a.address)),
      dates: removeDuplicates(dates.map((d) => d.date)),
    }

    console.log(data)

    // Send data, then redirect
  }

  return (
    <div className={styles.container}>
      <h1>Schedule a delivery</h1>
      {step === 1 ? (
        <FirstStep
          addresses={addresses}
          setAddresses={setAddresses}
          submit={submitFirstStep}
        />
      ) : (
        <SecondStep
          dates={dates}
          setDates={setDates}
          previous={() => setStep(1)}
          submit={submitSecondStep}
        />
      )}
    </div>
  )
}

export default ScheduleDelivery
