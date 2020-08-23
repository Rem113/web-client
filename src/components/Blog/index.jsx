import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import LinkCard from "./LinkCard"
import Pagination from "../Pagination"

import "./style.scss"
import axios from "axios"

const Blog = () => {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(-1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios
      .get("http://localhost:3000/api/post", { params: { page } })
      .then((res) => {
        setPosts(res.data.posts)
        setMaxPage(res.data.pages)
        setLoading(false)
      })
  }, [page])

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div className="blog-container">
      <h1>Blog</h1>

      {posts.map((post) => (
        <LinkCard key={post._id} title={post.title} postedAt={post.postedAt} />
      ))}

      <div className="actions">
        <Link className="register" to="/new-post">
          Add A New Subject
        </Link>
      </div>
      <Pagination page={page} maxPage={maxPage} onChangePage={setPage} />
    </div>
  )
}

export default Blog
