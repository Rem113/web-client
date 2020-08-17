import React from "react"
import { Link, useLocation } from "react-router-dom"

import "./style.scss"

export default () => {
  const { pathname } = useLocation()

  return (
    <header>
      <Link className="logo" to="/">
        <h1>Distribute</h1>
      </Link>
      <nav>
        <ul>
          <li>
            <Link className={pathname === "/" ? "active" : null} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link
              className={pathname === "/login" ? "active" : null}
              to="/login"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              className={pathname === "/register" ? "active" : null}
              to="/register"
            >
              Register
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
