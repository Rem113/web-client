import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import socketIO from "socket.io-client"

import styles from "./style.scss"

const ENDP = "//localhost:3000"

const Chat = () => {

    useEffect(() => {
        var socket = socketIO.connect(ENDP)
        socket.on('c', () => { "C" })
    }, [])

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Chat</h1>
            <div className={styles["form-group"]}>

            </div>
        </div>
    )
}

export default Chat