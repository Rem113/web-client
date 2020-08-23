import React from "react"
import { Link, useLocation, useHistory } from "react-router-dom"
import LogoutIcon from "../../assets/logout.svg"

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
  }

  function NonConnectedBanner() {
    return (
      <nav>
        <ul>
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
        </ul>
      </nav>
    )
  }

  function ConnectedBanner() {
    return (
      <nav>
        <ul>
          <li>
            <Link to="/">Hello, {name}</Link>
          </li>
          <li>
            <Link className={pathname === "/" ? styles.active : null} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link
              className={pathname.startsWith("/blog") ? styles.active : null}
              to="/blog"
            >
              Blog
            </Link>
          </li>
          <li>
            <a onClick={logout}>
              <img src={LogoutIcon} />
            </a>
          </li>
        </ul>
      </nav>
    )
  }

  function Banner() {
    if (token !== null) return ConnectedBanner()
    else return NonConnectedBanner()
  }

  return (
    <header>
      <Link className={styles.logo} to="/">
        <h1>Distribute</h1>
      </Link>
      <Banner />
    </header>
  )
}

export default Header
