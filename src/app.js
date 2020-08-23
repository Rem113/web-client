import React from "react"
import { render } from "react-dom"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import "./config/style-reset.scss"

import Header from "components/Header"
import Home from "components/Home"
import Login from "components/Login"
import Register from "components/Register"
import Blog from "components/Blog"
import WritePost from "components/WritePost"
import BlogPost from "./components/BlogPost"

const Fallback = () => <></>

const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/register" component={Register} exact />
      <Route path="/blog" component={Blog} exact />
      <Route path="/new-post" component={WritePost} exact />
      <Route path="/blog/:id" component={BlogPost} exact />
      <Route component={Fallback} />
    </Switch>
  </BrowserRouter>
)

render(<App />, document.querySelector("#root"))
