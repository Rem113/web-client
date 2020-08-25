import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { format } from "date-fns"
import ReactMarkdown from "react-markdown"

import styles from "./style.scss"
import { getPostById } from "../../api/post"

const BlogPost = () => {
  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState({})

  const { id } = useParams()

  const loadPost = async () => {
    const post = await getPostById(id)
    setPost(post)
    setLoading(false)
  }

  useEffect(() => {
    loadPost()
  }, [])

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div className={styles.container}>
      <h1>{post.title}</h1>
      <h4>Posted on {format(new Date(post.postedAt), "dd/MM/yyyy")}</h4>
      <ReactMarkdown
        className={styles.markdown}
        escapeHtml={false}
        source={post.content}
      />
    </div>
  )
}

export default BlogPost
