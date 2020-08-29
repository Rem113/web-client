import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import io from "socket.io-client"

import styles from "./style.scss"

const Chat = () => {

    useEffect(() => {
        const socket = io("http://localhost:3000")
        socket.emit('isManager', `Je suis ${localStorage.getItem('isManager')}`)
    }, [])

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Chat</h1>
            <div className={styles["form-group"]}></div>
        </div>
    )
}

export default Chat
