import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

import Pagination from "components/Pagination"
import BlogCard from "components/BlogCard"

import styles from "./style.scss"

const Blog = () => {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState()
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

  const isManager = localStorage.getItem("isManager")

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div className={styles.container}>
      <h1>Blog</h1>

      {isManager && (
        <Link className={styles["write-post-button"]} to="/write-post">
          Write a blog post
        </Link>
      )}

      {posts.map((post) => (
        <BlogCard
          key={post._id}
          id={post._id}
          title={post.title}
          postedAt={post.postedAt}
        />
      ))}

      <Pagination page={page} maxPage={maxPage} onChangePage={setPage} />
    </div>
  )
}

export default Blog
