import React, { Component } from "react"
import Posts from "../../components/Posts/Posts"
import Thoughts from "../../components/Thoughts/Thoughts"
import Events from "../../components/Events/Events"
import About from "../../components/About/About"
import Footer from "../../components/Footer/Footer"
import jwtDecode from "jwt-decode"
import { connect } from "react-redux"
import { getAllPosts } from "../../actions/posts"
import { performLikeAction } from "../../actions/posts"

export class Home extends Component {
  state = {
    score: 0
  }
  componentDidMount() {
    const { history } = this.props
    const token = localStorage.getItem("token")
    if (!token) history.push("/sign-in")
    else {
      const { getAllPosts } = this.props
      getAllPosts()
      const decoded = jwtDecode(token)
      const { score } = decoded
      this.setState({ score })
    }
  }
  render() {
    let score = this.state.score
    if (this.props.score) {
      score = this.props.score
    }
    const { history } = this.props
    console.log("new score", this.props.score)
    return (
      <>
        <Posts
          history={history}
          performLikeAction={this.props.performLikeAction}
          actionToDispatchUponLikeEvent={this.props.getAllPosts}
          posts={this.props.posts}
        />
        <section id="sidebar">
          <Thoughts score={score} history={history} />
          <Events history={history} />
          {/* <About history={history} /> */}
          <Footer history={history} />
        </section>
      </>
    )
  }
}

const mapStateToProps = state => ({
  score: state.posts.score,
  posts: state.posts.posts
})
export default connect(mapStateToProps, { getAllPosts, performLikeAction })(
  Home
)
