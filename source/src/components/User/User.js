import React, { Component } from "react"
import { Posts } from "../Posts/Posts"
import { connect } from "react-redux"
import { getUserPosts, getUserScore } from "../../actions/users"
import { performLikeAction } from "../../actions/posts"

import jwtDecode from "jwt-decode"
import { Link } from "react-router-dom"

export class User extends Component {
  state = {
    decoded: {},
    userProfile: false
  }
  componentDidMount() {
    const { history } = this.props
    const token = localStorage.getItem("token")
    if (!token) history.push("/sign-in")
    else {
      const decoded = jwtDecode(token)
      const { getUserPosts, getUserScore } = this.props
      if (
        this.props.location &&
        this.props.location.state &&
        this.props.location.state.user
      ) {
        const { user } = this.props.location.state
        getUserPosts(user)
        getUserScore(user)
        this.setState({ userProfile: true })
      } else getUserPosts(decoded.username)
      this.setState({ decoded })
    }
  }
  render() {
    const { userProfile } = this.state
    let user
    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.user
    )
      user = this.props.location.state.user
    return (
      <div style={{ width: "100%", height: "auto" }}>
        <a className="author">
          <span
            className="name"
            style={{
              fontSize: "20px",
              color: this.props.userScore
                ? this.props.userScore > 0
                  ? "green"
                  : this.props.userScore < 0
                  ? "red"
                  : null
                : null
            }}>
            {userProfile
              ? `${user} (${this.props.userScore ? this.props.userScore : 0}) `
              : `${this.state.decoded.firstName} ${this.state.decoded.lastName}`}
          </span>
          <img
            src="images/avatar.jpg"
            style={{ width: "80px", height: "80px" }}
            alt=""
          />
        </a>
        <Posts
          showBewPostButton={!userProfile}
          performLikeAction={this.props.performLikeAction}
          actionToDispatchUponLikeEvent={this.props.getUserPosts}
          username={this.state.decoded.username}
          posts={this.props.posts}
        />{" "}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.users.posts,
  userScore: state.users.userScore
})

export default connect(mapStateToProps, {
  getUserPosts,
  getUserScore,
  performLikeAction
})(User)
