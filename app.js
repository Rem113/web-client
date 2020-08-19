import React from "react"
import { render } from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import Header from "components/Header"
import Home from "components/Home"
import Login from "components/Login"
import Register from "components/Register"

const Fallback = () => <></>

const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/register" component={Register} exact />
      <Route component={Fallback} />
    </Switch>
  </BrowserRouter>
)

render(<App />, document.querySelector("#root"))
