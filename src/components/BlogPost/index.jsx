import React, { useEffect, useState } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import { animations } from 'react-animation'

import Axios from "axios"
import { formatDistanceToNow, format } from "date-fns"

import styles from "./style.scss"
import stylesCard from "../BlogCard/style.scss"

const BlogPost = () => {
  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState({})

  const [comment, setComment] = useState({ content: "", author: localStorage.getItem('name') })
  const [commentError, setCommentError] = useState("")

  const [writingComment, setWritingComment] = useState(true)

  const { id } = useParams()
  const history = useHistory()

  useEffect(() => {
    Axios.get(`http://localhost:3000/api/post/${id}`).then((res) => {
      setPost(res.data)
      setLoading(false)
    }).catch((_) => history.push("/blog"))
  }, [])

  function publishComment() {
    Axios.post(`http://localhost:3000/api/post/${id}`, comment).then(() => {
      setComment({ ...comment, content: "" })
      Axios.get(`http://localhost:3000/api/post/${id}`).then((res) =>
        setPost(res.data)
      )
    })
  }

  return loading ? (
    <p>Loading...</p>
  ) : (
      <div className={styles.container}>
        <div className={stylesCard['card']}>
          <h1>{post.title}</h1>
          <h4>Posted on {format(new Date(post.postedAt), "dd/MM/yyyy")} by <strong>{post.author}</strong></h4>
          <p>{post.content}</p>
        </div>

        <div className={styles["form-group"]}>
          <button
            className={["button", (writingComment === true ? "hidden" : "showed")]}>
            Add a comment
          </button>

          <div className={(writingComment === true) ? "showed" : "hidden"}>
            <textarea
              type="text"
              name="content"
              value={comment.content}
              onChange={(e) => setComment({ ...comment, [e.target.name]: e.target.value })}
              rows="5"
            />
            <small className={styles.error}>{commentError}</small>
            <button className="button" onClick={publishComment}>
              Publish
        </button>
          </div>

        </div>

        <hr />

        {post.comments
          .sort((a, b) => a.itemM > b.itemM ? 1 : -1)
          .map((comment, i) =>
            <div key={i} className={stylesCard['card-response']}>
              <h3>{comment.author} · <small style={{ color: "gray" }}>{formatDistanceToNow(new Date(comment.postedAt))} ago</small></h3>
              <p>{comment.content}</p>
            </div>)}
      </div>
    )
}

export default BlogPost
