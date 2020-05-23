import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"

export class Posts extends Component {
  // componentDidMount() {
  //   const { getAllPosts } = this.props
  //   getAllPosts()
  // }

  likeAction = id => {
    this.props.performLikeAction(
      id,
      this.props.actionToDispatchUponLikeEvent,
      this.props.username
    )
  }

  goToPost = id => {
    this.props.history.push({
      pathname: `/post/${id}`,
      state: { id }
    })
  }
  render() {
    const { posts } = this.props
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
    const URL = "https://www.google.com"
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

        {posts.length === 0 ? (
          this.props.showBewPostButton ? (
            <p>Nothing to show here! Create a new post!</p>
          ) : (
            <p>User has not posted anything</p>
          )
        ) : null}
        {posts.map(p => {
          console.log(p.group ? p.group : "")
          const date = new Date(p.date)
          return (
            <article key={p._id} className="post">
              <header>
                <div className="title">
                  <h2
                    onClick={() => this.goToPost(p._id)}>{`${p.postTitle}`}</h2>
                  <p>{` ${p.group ? `SHARED in ${p.group.name}` : ""}`}</p>
                  <div
                    class="fb-share-button"
                    data-href={`${URL}/post/p._id`}
                    data-layout="button"
                    data-size="small">
                    <a
                      target="_blank"
                      href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A3000%2Fpost%2F5e450af4ced6674618d6c403&amp;src=sdkpreparse"
                      class="fb-xfbml-parse-ignore">
                      Share
                    </a>
                  </div>
                </div>

                <div className="meta">
                  <Link to="#" className="author">
                    <span className="name">{p.username}</span>
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
              <p>{p.post}</p>
              <footer>
                <ul className="stats">
                  <li>
                    <Link
                      onClick={() => this.likeAction(p._id)}
                      className="icon solid fa-heart">
                      {p.likes.length}
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
          )
        })}
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

export default connect(null, {})(Posts)
