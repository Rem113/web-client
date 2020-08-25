import React from "react"
import { Route, useHistory } from "react-router-dom"

const ProtectedRoute = (props) => {
  const history = useHistory()

  if (localStorage.getItem("token") === null) {
    history.push("/login")
    return <></>
  }

  return <Route {...props} />
}

export default ProtectedRoute
