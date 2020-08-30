import React, { useState } from "react"
import { Link } from "react-router-dom"
import io from "socket.io-client"

import styles from "./style.scss"

const socket = io("http://localhost:3000")

const Chat = () => {
  const [chat, setChat] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([])

  const focusMessageBox = () => document.getElementById("message-box").focus()

  const startChat = () => {
    setChat(true)
    socket.emit("start", input)
    setInput("")
    focusMessageBox()

    socket.on("message", ({ user, message }) => {
      setMessages((messages) => [...messages, { isInfo: false, user, message }])
    })

    socket.on("info", ({ user, info }) => {
      setMessages((messages) => [...messages, { isInfo: true, user, info }])
    })

    socket.on("back-up", (backup) => {
      setMessages(backup.map((m) => ({ isInfo: false, ...m })))
    })
  }

  const sendMessage = () => {
    input && socket.emit("message", input)
    setInput("")
    focusMessageBox()
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Chat</h1>
      <div className={styles["form-group"]}>
        <input
          id="message-box"
          autoFocus={true}
          autoComplete="off"
          placeholder={chat ? "Message" : "Username"}
          onChange={({ target }) => setInput(target.value)}
          value={input}
        />

        {chat && <button onClick={sendMessage}>Send a message</button>}
        {!chat && <button onClick={startChat}>Start a chat</button>}

        <hr />

        {messages.map((message, i) => (
          <p className={message.isInfo ? styles.hint : styles.message} key={i}>
            <strong>
              {message.user}
              {message.isInfo ? " " : ": "}
            </strong>
            {message.isInfo ? message.info : message.message}
          </p>
        ))}
      </div>
    </div>
  )
}

export default Chat
