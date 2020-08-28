import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import io from "socket.io-client"

import styles from "./style.scss"

const socket = io("http://localhost:3000")

const Chat = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Chat</h1>
      <div className={styles["form-group"]}></div>
    </div>
  )
}

export default Chat
