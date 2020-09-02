import React, { useState } from "react"
import { Link } from "react-router-dom"
import io from "socket.io-client"
import { format, parseISO } from "date-fns"

import styles from "./style.scss"

const socket = io("http://localhost:3000")

const Chat = () => {
  const [chat, setChat] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([])

  const isManager = sessionStorage.getItem("isManager") === "true"

  const scrollToBottom = () => {
    const chatbox = document.getElementById("chatbox")
    chatbox.scrollTop = chatbox.scrollHeight
  }

  const startChat = () => {
    setChat(true)
    socket.emit("start", {
      user: input,
      isManager,
    })
    setInput("")

    socket.on("message", (message) => {
      setMessages((messages) => [...messages, { isInfo: false, ...message }])
      scrollToBottom()
    })

    socket.on("info", (message) => {
      setMessages((messages) => [...messages, { isInfo: true, ...message }])
      scrollToBottom()
    })

    socket.on("back-up", (backup) => {
      setMessages(backup.map((message) => ({ isInfo: false, ...message })))
      scrollToBottom()
    })
  }

  const sendMessage = () => {
    input && socket.emit("message", input)
    setInput("")
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Chat</h1>
      <div
        id="chatbox"
        className={styles.chatbox}
        style={{ display: chat ? "block" : "none" }}
      >
        {messages.map((message, i) => (
          <p className={message.isInfo ? styles.info : styles.message} key={i}>
            <span className={styles.date}>
              {format(parseISO(message.date), "HH:mm:ss ")}
            </span>
            <strong
              className={message.isManager ? styles.manager : styles.user}
            >
              {message.user}
              {message.isInfo ? " " : ": "}
            </strong>
            {message.isInfo ? message.info : message.message}
          </p>
        ))}
      </div>
      <div className={styles["chatbox-action"]}>
        {chat || <label htmlFor="message-box">Username: </label>}
        <input
          id="message-box"
          autoComplete="off"
          onChange={({ target }) => setInput(target.value)}
          onKeyDown={({ key }) =>
            key === "Enter" && (chat ? sendMessage() : startChat())
          }
          value={input}
        />
        {chat && <button onClick={sendMessage}>Send</button>}
        {!chat && <button onClick={startChat}>Join</button>}
      </div>
    </div>
  )
}

export default Chat
