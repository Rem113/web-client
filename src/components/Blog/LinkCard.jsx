import React from "react"
import { Link } from "react-router-dom"
import { formatDistanceToNow } from "date-fns"

import "./style.scss"

function LinkCard(props) {
  return (
    <Link className="link-card" to="#">
      <div className="card">
        <h2>{props.title}</h2>
        <p>
          <strong>
            Published {formatDistanceToNow(new Date(props.postedAt))} ago
          </strong>
        </p>
      </div>
    </Link>
  )
}

export default LinkCard
