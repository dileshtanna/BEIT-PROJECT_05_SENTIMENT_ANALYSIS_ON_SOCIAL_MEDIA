import React, { Component } from "react"
import { connect } from "react-redux"
import { login } from "../../actions/auth"
import { Link } from "react-router-dom"

export class Login extends Component {
  state = {
    username: "",
    password: ""
  }

  componentDidMount() {
    const { history } = this.props
    const token = localStorage.getItem("token")
    if (token) history.push("/")
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = () => {
    const { login, history } = this.props
    const { username, password } = this.state
    login(username, password, history)
  }
  render() {
    return (
      <div
        style={{
          margin: "auto"
          // width: "100%",
          // height: "100%"
        }}>
        <div className="col-9">
          <div className="post">
            <div className="row gtr-uniform">
              <div className="meta">
                <h1>Sign In</h1>
              </div>
              <div className="col-12 ">
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                  placeholder="Username"
                />
              </div>
              <div className="col-12 ">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  placeholder="Password"
                />
              </div>
              <div className="col-12">
                <ul className="actions">
                  <li>
                    <button onClick={this.handleSubmit}>Sign In</button>
                  </li>
                </ul>
              </div>
              <div className="col-12">
                <span>
                  Don't have an account? <Link to="/sign-up">Sign Up</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, { login })(Login)
