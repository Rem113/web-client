import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { formatDistanceToNow, format } from "date-fns"
import ReactMarkdown from "react-markdown"

import Axios from "axios"

import styles from "./style.scss"
import stylesCard from "../../components/BlogCard/style.scss"

import { getPostById } from "../../api/post"

const BlogPost = () => {
  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState({})

  const [comment, setComment] = useState({ content: "", author: localStorage.getItem('name') })
  const [commentError, setCommentError] = useState("")

  const [writingComment, setWritingComment] = useState(true)

  const { id } = useParams()
  const history = useHistory()

  const loadPost = async () => {
    const post = await getPostById(id)
    post === null ? history.push('/blog') : null
    setPost(post)
    setLoading(false)
  }

  useEffect(() => {
    loadPost()
  }, [])

  function publishComment() {
    setWritingComment(!writingComment)
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
          <ReactMarkdown
            className={styles.markdown}
            escapeHtml={false}
            source={post.content}
          />
        </div>

        <div className={styles["form-group"]}>
          {writingComment === true ?
            <button
              className={"button"}
              onClick={() => setWritingComment(!writingComment)}>
              Add a comment
          </button> :
            <>
              <textarea
                type="text"
                name="content"
                value={comment.content}
                onChange={(e) => setComment({ ...comment, [e.target.name]: e.target.value })}
                rows="5"
                placeholder="Leave a little comment..."
              />
              <small className={styles.error}>{commentError}</small>
              <button className="button" onClick={publishComment}>
                Publish
            </button>
            </>
          }
        </div>

        <hr />

        {post.comments
          .map((comment, i) =>
            <div key={i} className={stylesCard['card-response']}>
              <h3>{comment.author} · <small style={{ color: "gray" }}>{formatDistanceToNow(new Date(comment.postedAt))} ago</small></h3>
              <p>{comment.content}</p>
            </div>)}
      </div>
    )
}

export default BlogPost