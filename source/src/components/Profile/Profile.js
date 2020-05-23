import React, { Component } from "react"
import { Posts } from "../Posts/Posts"
import { connect } from "react-redux"
import { getUserPosts } from "../../actions/users"
import { performLikeAction } from "../../actions/posts"

import jwtDecode from "jwt-decode"

export class Profile extends Component {
  state = {
    decoded: {}
  }
  componentDidMount() {
    const { history } = this.props
    const token = localStorage.getItem("token")
    if (!token) history.push("/sign-in")
    else {
      const decoded = jwtDecode(token)
      const { getUserPosts } = this.props
      getUserPosts(decoded.username)
      this.setState({ decoded })
    }
  }
  render() {
    return (
      <div style={{ width: "100%", height: "auto" }}>
        <a href="#" className="author">
          <span className="name" style={{ fontSize: "20px" }}>
            {`${this.state.decoded.firstName} ${this.state.decoded.lastName}`}
          </span>
          <img
            src="https://www.oneworldplayproject.com/wp-content/uploads/2016/03/avatar-1024x1024.jpg"
            style={{ width: "80px", height: "80px" }}
            alt=""
          />
        </a>
        <Posts
          showBewPostButton={true}
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
  posts: state.users.posts
})

export default connect(mapStateToProps, { getUserPosts, performLikeAction })(
  Profile
)
