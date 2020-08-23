import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LinkCard from './LinkCard'

import "./style.scss"
import axios from 'axios'

const Blog = () => {

    const [posts, setPosts] = useState({})

    useEffect(() => {
        axios.get('http://localhost:3000/api/post').then((res) => {

            let counterPost = {}
            res.data.forEach(post => {
                if (counterPost[post.title] === undefined) {
                    counterPost[post.title] = 1;
                }
                else counterPost[post.title] += 1
            });
            setPosts(counterPost)
        })
    })

    return (
        <div className="blog-container">
            <h1>Blog</h1>

            <a className="link-card" href="#">
                <div className="card">
                    <h2>Comment acheter le Dolirhume ?</h2>
                    <p><strong>Publié le 23/08/2020 à 14:59 · 15 publications</strong></p>
                </div></a>
            {Object.keys(posts).map((keyName, i) => <LinkCard
                key={i}
                title={keyName}
                numberPub={posts[keyName]}
            />)}

            <div className="actions">
                <Link className="register" to="/new-post">Add A New Subject</Link>
            </div>

        </div>
    )
}

export default Blog