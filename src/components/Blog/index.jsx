import React from 'react'
import { Link } from 'react-router-dom'

import "./style.scss"

const Blog = () => {
    return (
        <div className="blog-container">
            <h1>Blog</h1>

            <a className="link-card" href="#">
                <div className="card">
                    <h2>Comment acheter le Dolirhume ?</h2>
                    <p><strong>Publié le 23/08/2020 à 14:59 · 15 publications</strong></p>
                </div></a>
            <a className="link-card" href="#">
                <div className="card">
                    <h2>Comment acheter le Dolirhume ?</h2>
                    <p><strong>Publié le 23/08/2020 à 14:59 · 15 publications</strong></p>
                </div></a>

            <div className="actions">
                <Link className="register" to="/new-post">Add A New Subject</Link>
            </div>

        </div>
    )
}

export default Blog