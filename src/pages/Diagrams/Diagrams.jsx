import React from "react"
import { Pie } from "react-chartjs-2"
import color from "randomcolor"

import styles from "./style.scss"

const Diagrams = () => {

  return (

    <div className={styles["home-container"]}>
      <h1>Diagrams</h1>
      <Pie data={{
        datasets: [{
          data: [10, 20, 30, 40],
          backgroundColor: [color(), color(), color(), color()]
        }], labels: ['red', 'blue', 'yellow', 'brown']
      }}

        width={200}
        height={50}

      />
    </div>
  )
}

export default Diagrams
