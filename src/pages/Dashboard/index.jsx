import React from "react"
import { Map, TileLayer, Marker } from "react-leaflet"

import styles from "./style.scss"

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <Map className={styles.map} center={[31.764888, 35.191279]} zoom="12">
        <TileLayer url="https://api.mapbox.com/styles/v1/rem113/cke9uj1116dk319o8bskh9yyf/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicmVtMTEzIiwiYSI6ImNrZTlzdjcyYTJhMnIyem80d3A0MjBnMDAifQ.eXwwRuI5l9XEPbRYghBbKA" />
        <Marker position={[31.764888, 35.191279]} />
      </Map>
    </div>
  )
}

export default Dashboard
