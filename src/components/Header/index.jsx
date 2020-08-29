import React from "react"
import { Link, useLocation, useHistory } from "react-router-dom"

import styles from "./style.scss"

const Header = () => {
  const { pathname } = useLocation()
  const history = useHistory()

  let token = localStorage.getItem("token")
  let name = null

  if (token !== null) name = localStorage.getItem("name")

  const logout = () => {
    localStorage.clear()
    history.push("/")
    return;
  }

  const GuestLinks = () => (
    <>
      <li>
        <Link className={pathname === "/" ? styles.active : null} to="/">
          Home
        </Link>
      </li>
      <li>
        <Link
          className={pathname === "/login" ? styles.active : null}
          to="/login"
        >
          Login
        </Link>
      </li>
      <li>
        <Link
          className={pathname === "/register" ? styles.active : null}
          to="/register"
        >
          Register
        </Link>
      </li>
    </>
  )

  const isManager = localStorage.getItem('isManager') == "true"

  const UserLinks = () => (
    <>
      <li>
        <Link className={styles.avatar} to="/dashboard">
          {name.split(" ")[0][0].toUpperCase()}
        </Link>
      </li>
      <li>
        <Link
          className={
            pathname.startsWith("/blog") || pathname === "/write-post"
              ? styles.active
              : null
          }
          to="/blog"
        >
          Blog
        </Link>
      </li>
      <li>
        <Link className={pathname === "/chat" ? styles.active : null} to="/chat">Chat</Link>
      </li>

      {isManager && (<li>
        <Link className={pathname === "/deliverers" ? styles.active : null} to="/deliverers">Deliverers</Link>
      </li>)}
      <li>
        <a onClick={logout}>Logout</a>
      </li>
    </>
  )

  return (
    <header>
      <Link className={styles.logo} to="/">
        <h1>Distribute</h1>
      </Link>
      <nav>
        <ul>{token === null ? <GuestLinks /> : <UserLinks />}</ul>
      </nav>
    </header>
  )
}

export default Header
