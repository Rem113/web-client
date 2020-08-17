import React from "react"
import { render } from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import Header from "components/Header"
import Home from "components/Home"

const Login = () => <></>
const Fallback = () => <></>

const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/login" component={Login} exact />
      <Route component={Fallback} />
    </Switch>
  </BrowserRouter>
)

render(<App />, document.querySelector("#root"))
