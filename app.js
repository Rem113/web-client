import React from "react"
import { render } from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import Header from "components/Header"
import Home from "components/Home"
import Login from "components/Login"
import Register from "components/Register"
import Logout from "components/Logout"
import Blog from "components/Blog"
import NewPost from "components/NewPost"

const Fallback = () => <></>

const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/register" component={Register} exact />
      <Route path="/logout" component={Logout} exact />
      <Route path="/blog" component={Blog} exact />
      <Route path="/new-post" component={NewPost} exact />
      <Route component={Fallback} />
    </Switch>
  </BrowserRouter>
)

render(<App />, document.querySelector("#root"))
