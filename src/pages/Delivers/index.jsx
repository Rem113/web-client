import React, { useState, useEffect } from "react"
import { getDelivers } from "../../api/auth"

import axios from 'axios'
import styles from "./style.scss"

const Delivers = () => {
    const [delivers, setDelivers] = useState([])
    const [modifiedFields, setModifiedFields] = useState({})

    const getDelivers = () => {
        axios.get('http://localhost:3000/api/auth/delivers')
            .then((res) => {
                var delivers = res.data

                delivers.forEach(element => {
                    element.isChanged = false
                });

                setDelivers(delivers)
            })
    }

    const removeChangedColor = () => {
        for (var i in modifiedFields)
            modifiedFields[i].style = styles.input

        setModifiedFields({})
    }

    useEffect(() => {
        getDelivers()
    }, [])

    const handleChange = (e) => {
        const [name, id] = e.target.name.split(" ")
        const value = e.target.value

        let newDelivers = [...delivers]
        newDelivers[id][name] = (name === "age" ? Number(value) : value)
        newDelivers[id].isChanged = true

        e.target.style.backgroundColor = "#40e440"
        setModifiedFields({ ...modifiedFields, [e.target.name]: e.target })

        setDelivers(newDelivers)
    }

    const handleSaveChanges = async () => {
        const deliversChanged = delivers.filter(deliver => deliver.isChanged === true)

        await axios.put('http://localhost:3000/api/auth/delivers', deliversChanged)
        getDelivers()
        removeChangedColor()
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Delivers</h1>
            <div className={styles['form-group']}>

                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {delivers.map((deliver, i) =>
                            <tr key={i}>
                                <td><input type="text" name={"name " + i} onChange={handleChange} value={deliver.name} /></td>
                                <td><input type="number" name={"age " + i} onChange={handleChange} value={deliver.age} /></td>
                                <td><input type="email" name={"email " + i} onChange={handleChange} value={deliver.email} /></td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <button onClick={handleSaveChanges}>Save Changes</button>

            </div>
        </div>
    )
}

export default Delivers