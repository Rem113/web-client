import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { getDeliverers } from "../../api/auth"

import axios from "axios"
import styles from "./style.scss"

const Deliverers = () => {
  const [deliverers, setDeliverers] = useState([])
  const [modifiedFields, setModifiedFields] = useState({})

  const history = useHistory()

  const getDeliverers = () => {
    axios.get("http://localhost:3000/api/auth/deliverers").then((res) => {
      var deliverers = res.data

      deliverers.forEach((element) => {
        element.isChanged = false
      })

      setDeliverers(deliverers)
    })
  }

  const removeChangedColor = () => {
    for (var i in modifiedFields) modifiedFields[i].style = styles.input

    setModifiedFields({})
  }

  useEffect(() => {
    if (sessionStorage.getItem("isManager") !== "true") {
      history.push("/")
      return
    } else getDeliverers()
  }, [])

  const handleChange = (e) => {
    const [name, id] = e.target.name.split(" ")
    const value = e.target.value

    let newDeliverers = [...deliverers]
    newDeliverers[id][name] = name === "age" ? Number(value) : value
    newDeliverers[id].isChanged = true

    e.target.style.backgroundColor = "#40e440"
    setModifiedFields({ ...modifiedFields, [e.target.name]: e.target })

    setDeliverers(newDeliverers)
  }

  const handleSaveChanges = async () => {
    const deliverersChanged = deliverers.filter(
      (deliver) => deliver.isChanged === true
    )

    await axios.put(
      "http://localhost:3000/api/auth/deliverers",
      deliverersChanged
    )
    getDeliverers()
    removeChangedColor()
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Deliverers</h1>
      <div className={styles["form-group"]}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {deliverers.map((deliver, i) => (
              <tr key={i}>
                <td>
                  <input
                    type="text"
                    name={"name " + i}
                    onChange={handleChange}
                    value={deliver.name}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name={"age " + i}
                    onChange={handleChange}
                    value={deliver.age}
                  />
                </td>
                <td>
                  <input
                    type="email"
                    name={"email " + i}
                    onChange={handleChange}
                    value={deliver.email}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={handleSaveChanges}>Save Changes</button>
      </div>
    </div>
  )
}

export default Deliverers
