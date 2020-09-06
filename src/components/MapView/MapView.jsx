import React from "react"
import { Map, TileLayer, Marker } from "react-leaflet"

import styles from "./style.scss"

const MapView = ({ markers }) => (
  <Map
    className={styles.map}
    bounds={
      markers.length > 0
        ? markers
        : [
            [0, 0],
            [0, 0],
          ]
    }
    boundsOptions={{ padding: [50, 50] }}
  >
    <TileLayer url="https://api.mapbox.com/styles/v1/rem113/cke9uj1116dk319o8bskh9yyf/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicmVtMTEzIiwiYSI6ImNrZTlzdjcyYTJhMnIyem80d3A0MjBnMDAifQ.eXwwRuI5l9XEPbRYghBbKA" />
    {markers.map((marker) => (
      <Marker key={JSON.stringify(marker)} position={marker} />
    ))}
  </Map>
)

export default MapView
