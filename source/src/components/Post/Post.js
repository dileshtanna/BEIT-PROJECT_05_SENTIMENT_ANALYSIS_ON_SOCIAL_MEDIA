import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { getSinglePost, performLikeAction } from "../../actions/posts"

export class Post extends Component {
  // componentDidMount() {
  //   const { getAllPosts } = this.props
  //   getAllPosts()
  // }

  likeAction = id => {
    this.props.performLikeAction(
      id,
      this.props.match.params.id,
      this.props.username,
      true
    )
  }

  componentDidMount() {
    console.log(this.props.location)
    const { getSinglePost } = this.props
    const { id } = this.props.match.params
    getSinglePost(id)
  }

  render() {
    const { post } = this.props
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]
    const date = new Date(post.date)
    if (!post._id) return null
    return (
      <div id="main">
        {this.props.showBewPostButton ? (
          <ul className="actions">
            <li>
              <Link to="/new-post" className="button large">
                NEW POST
              </Link>
            </li>
          </ul>
        ) : null}
        {/* <!-- Post -->		 */}

        <article key={post._id} className="post">
          <header>
            <div className="title">
              <h2>{`${post.postTitle}`}</h2>
              <p>{` ${post.group ? `SHARED in ${post.group.name}` : ""}`}</p>
            </div>
            <div className="meta">
              <Link to="#" className="author">
                <span className="name">{post.username}</span>
                <img
                  src="https://www.oneworldplayproject.com/wp-content/uploads/2016/03/avatar-1024x1024.jpg"
                  alt=""
                />
              </Link>
              <time className="published" dateTime="2015-11-01">
                {`${
                  monthNames[date.getMonth()]
                } ${date.getDate()}, ${date.getFullYear()}`}
              </time>
            </div>
          </header>
          <Link to="#" className="image featured">
            <img
              src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60"
              alt=""
            />
          </Link>
          <p>{post.post}</p>
          <footer>
            <ul className="stats">
              <li>
                <Link
                  to="#"
                  onClick={() => this.likeAction(post._id)}
                  className="icon solid fa-heart">
                  {post.likes.length}
                </Link>
              </li>
              {/* <li>
                    <a href="#" className="icon solid fa-comment">
                      128
                    </a>
                  </li> */}
            </ul>
          </footer>
        </article>

        {/* <ul className="actions pagination">
          <li>
            <a href="" className="disabled button large previous">
              Previous Page
            </a>
          </li>
          <li>
            <a href="#" className="button large next">
              Next Page
            </a>
          </li>
        </ul> */}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  post: state.posts.post
})

export default connect(mapStateToProps, { getSinglePost, performLikeAction })(
  Post
)
