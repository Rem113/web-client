import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import axios from 'axios'

import styles from "./style.scss"

const Delivers = () => {
    const [delivers, setDelivers] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/api/auth/delivers')
            .then((res) => setDelivers(res.data))
    }, [])

    const handleChange = (e) => {
        const [name, id] = e.target.name.split(" ")

        console.log(e.target)
        delivers[id][e.target.name] = e.target.value

        setDelivers(newDelivers)
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Delivers</h1>
            <div className={styles["form-group"]}>

                {delivers.map((deliver, i) =>
                    <div key={i}>
                        <input type="text" name={"name " + i} onChange={handleChange} value={deliver.name} />
                        <input type="text" name={"age " + i} onChange={handleChange} value={deliver.age} />
                        <input type="text" name={"email " + i} onChange={handleChange} value={delivers.email} />
                    </div>)}

            </div>
        </div>
    )
}

export default Delivers