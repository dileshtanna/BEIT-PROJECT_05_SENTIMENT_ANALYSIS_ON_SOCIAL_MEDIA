import React from "react"
import axios from "axios"

import "./App.css"
import Root from "./Root"
import Navbar from "./components/Navbar/Navbar"

import { BrowserRouter as Router, Route } from "react-router-dom"
import Home from "./components/Home/Home"
import NewPost from "./components/NewPost/NewPost"
import Dashboard from "./components/Dashboard/Dashboard"
import Login from "./components/Login/Login"
import SignUp from "./components/SignUp/SignUp"
import Profile from "./components/Profile/Profile"
import NewGroup from "./components/NewGroup/NewGroup"
import User from "./components/User/User"
import Post from "./components/Post/Post"
import BulkNotifications from "./components/BulkNitifications/BulkNotifications"

export default function App() {
  const token = localStorage.getItem("token")
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
  return (
    <Root>
      <Router>
        <div id="wrapper">
          <Navbar token={token} />
          <Route exact path="/" component={Home} />
          <Route exact path="/sign-in" component={Login} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/new-post" component={NewPost} />
          <Route exact path="/new-group" component={NewGroup} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/user" component={User} />
          <Route exact path="/post/:id" component={Post} />
          <Route exact path="/notify" component={BulkNotifications} />
        </div>
      </Router>
    </Root>
  )
}
