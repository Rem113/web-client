import React, { useEffect, useState } from "react"
import { Pie, Bar } from "react-chartjs-2"
import color from "randomcolor"

import { getAllDeliveries } from "api/delivery"

import styles from "./style.scss"

const Diagrams = () => {
  const [deliveries, setDeliveries] = useState([])
  const [sortedByCompletion, setSortedByCompletion] = useState([])
  const [sortedByCategory, setSortedByCategory] = useState([])
  const [sortedByMonth, setSortedByMonth] = useState([])

  useEffect(() => {
    getAllDeliveries().then((deliveries) => setDeliveries(deliveries))
  }, [])

  useEffect(() => {
    sortByCompletion()
    sortByCategory()
    sortByMonth()
  }, [deliveries])

  const sortByCompletion = () => {
    let sorted = [0, 0]
    deliveries.map((d, i) => {
      d.done === true ? sorted[0]++ : sorted[1]++
    })

    setSortedByCompletion(sorted)
  }

  const sortByCategory = () => {
    let sorted = [0, 0]
    deliveries.map((d, i) => {
      d.food === true ? sorted[0]++ : null
      d.medicine === true ? sorted[1]++ : null
    })

    setSortedByCategory(sorted)
  }

  const sortByMonth = () => {
    let sorted = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    var date
    deliveries.map((d, i) => {
      date = new Date(d.date)
      sorted[date.getMonth()]++
    })

    setSortedByMonth(sorted)
  }

  return (
    <div className={styles.container}>
      <h1>Chalom</h1>

      <button onClick={sortByCompletion}>Sort By Completed</button>
      <Pie
        data={{
          datasets: [
            {
              data: sortedByCompletion,
              backgroundColor: ["rgb(95, 224, 44)", "rgb(221, 35, 82)"],
            },
          ],
          labels: ["Completed", "Uncompleted"],
        }}
        options={{
          maintainAspectRatio: true,
          title: { display: true, text: "Completude of All Tasks" },
        }}
      />

      <button onClick={sortByCategory}>Sort By Category</button>
      <Pie
        data={{
          datasets: [
            {
              data: sortedByCategory,
              backgroundColor: ["rgb(128, 240, 147)", "rgb(244, 186, 225)"],
            },
          ],
          labels: ["Food", "Medicine"],
        }}
        options={{
          maintainAspectRatio: true,
          title: { display: true, text: "Number of Delivery per Category" },
        }}
      />

      <button onClick={sortByMonth}>Sort By Month</button>
      <Bar
        data={{
          datasets: [
            {
              label: "Months",
              data: sortedByMonth,
              backgroundColor: [
                color(),
                color(),
                color(),
                color(),
                color(),
                color(),
                color(),
                color(),
                color(),
                color(),
                color(),
                color(),
              ],
            },
          ],
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        }}
        options={{
          maintainAspectRatio: true,
          title: { display: true, text: "Number of Delivery per Month" },
        }}
      />
    </div>
  )
}

export default Diagrams
