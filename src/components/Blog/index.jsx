import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import BlogCard from "../BlogCard/BlogCard"
import Pagination from "../Pagination"
import axios from "axios"

import styles from "./style.scss"

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
      <div className={styles.container}>
        <h1>Blog</h1>

        <Link className={styles["write-post-button"]} to="/new-post">
          Write a blog post
      </Link>

        {posts.map((post) => (
          <BlogCard
            key={post._id}
            id={post._id}
            title={post.title}
            author={post.author}
            postedAt={post.postedAt}
            numberComments={post.comments.length}
          />
        ))}

        <Pagination page={page} maxPage={maxPage} onChangePage={setPage} />
      </div>
    )
}

export default Blog
