import React, { useState } from "react"
import { Link } from "react-router-dom"
import io from "socket.io-client"

import styles from "./style.scss"

const Chat = () => {
    const [chat, setChat] = useState(false)
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([])

    const startChat = () => {
        setChat(true)
        socket.emit("start", input)
        setInput("")
        socket.on("message", ({ user, message }) => {
            setMessages((messages) => [...messages, { isInfo: false, user, message }])
        })
        socket.on("info", ({ user, info }) => {
            setMessages((messages) => [...messages, { isInfo: true, user, info }])
        })
    }

    const sendMessage = () => {
        socket.emit("message", input)
        setInput("")
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Chat</h1>
            <input
                placeholder={chat ? "Message" : "Username"}
                onChange={({ target }) => setInput(target.value)}
                value={input}
            />
            {messages.map((message, i) => (
                <p className={message.isInfo ? styles.info : styles.message} key={i}>
                    <strong>
                        {message.user}
                        {message.isInfo ? " " : ": "}
                    </strong>
                    {message.isInfo ? message.info : message.message}
                </p>
            ))}
            {chat && <button onClick={sendMessage}>Send a message</button>}
            {!chat && <button onClick={startChat}>Start a chat</button>}
        </div>
    )
}

export default Chat
