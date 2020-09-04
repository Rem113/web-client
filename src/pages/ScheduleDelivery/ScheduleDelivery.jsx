import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { v4 as uuid } from "uuid"

import { scheduleDelivery } from "api/delivery"

import dateToString from "core/date_to_string"
import removeDuplicates from "core/remove_duplicates"

import FirstStep from "./FirstStep"
import SecondStep from "./SecondStep"

import styles from "./style.scss"

const ScheduleDelivery = () => {
  const history = useHistory()

  const [step, setStep] = useState(1)

  const [food, setFood] = useState(false)
  const [medicine, setMedicine] = useState(false)
  const [checkboxesError, setCheckboxesError] = useState("")
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
    else if (!food && !medicine)
      setCheckboxesError("Please select either food or medicine")
    else setStep(2)
  }

  const submitSecondStep = async () => {
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
      food,
      medicine,
    }

    // Send data, then redirect
    await scheduleDelivery(data)

    history.push("/dashboard")
  }

  return (
    <div className={styles.container}>
      <h1>Schedule a delivery</h1>
      {step === 1 ? (
        <FirstStep
          food={food}
          setFood={setFood}
          medicine={medicine}
          setMedicine={setMedicine}
          checkboxesError={checkboxesError}
          setCheckboxesError={setCheckboxesError}
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
