import React from 'react'
import { Link } from 'react-router-dom'
import './style.scss'

function LinkCard(props) {
    return <Link className="link-card" to="#">
        <div className="card">
            <h2>{props.title}</h2>
            <p><strong>Published on 23/08/2020 à 14:59 · {props.numberPub} publication{props.numberPub > 1 ? "s" : ""}</strong></p>
        </div></Link>
}

export default LinkCard
