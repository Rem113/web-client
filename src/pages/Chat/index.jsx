import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import socketIO from "socket.io"

import styles from "./style.scss"

const ENDPOINT = "http://127.0.0.1:3005"

const Chat = () => {

    // const io = socketIO(ENDPOINT)
    // io.on('message', data => {
    //     console.log(data)
    // })

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Chat</h1>
            <div className={styles["form-group"]}>

            </div>
        </div>
    )
}

export default Chat