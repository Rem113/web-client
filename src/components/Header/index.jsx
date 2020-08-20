import React from "react"
import { Link, useLocation } from "react-router-dom"

import "./style.scss"

export default () => {
  const { pathname } = useLocation()

  let [token, infos] = [null, null]

  token = localStorage.getItem('token')
  if (token != null)
    infos = localStorage.getItem('infos').split(',');

  function NonConnectedBanner() {
    return (
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
    );
  }

  function ConnectedBanner() {
    return (<nav>
      <ul>
        <li>
          <Link to="/">Hello {infos[0]}</Link>
        </li>
        <li>
          <Link className={pathname === "/" ? "active" : null} to="/">
            Home
          </Link>
        </li>
        <li>
          <Link to='/logout'><i className="fas fa-sign-out-alt"></i></Link>
        </li>
      </ul>
    </nav>)
  }

  function Banner() {
    if (token != null)
      return ConnectedBanner()
    else
      return NonConnectedBanner()
  }

  return (
    <header>
      <Link className="logo" to="/">
        <h1>Distribute</h1>
      </Link>
      <Banner />
    </header>
  )
}


