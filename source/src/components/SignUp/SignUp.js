import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../../actions/auth";

export class SignUp extends Component {
  state = {
    username: "",
    password: "",
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    confirmPassword: ""
  };

  componentDidMount() {
    const { history } = this.props;
    const token = localStorage.getItem("token");
    if (token) history.push("/");
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = () => {
    const { signUp, history } = this.props;
    const {
      username,
      password,
      email,
      phone,
      firstName,
      lastName
    } = this.state;
    signUp(firstName, lastName, username, password, email, phone, history);
  };
  render() {
    return (
      <div style={{ margin: "auto" }}>
        <div className="col-8">
          <div className="post">
            <div className="row gtr-uniform">
              <div className="meta">
                <h1>Sign Up</h1>
              </div>
              <div className="col-12 ">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                  placeholder="First Name"
                />
              </div>
              <div className="col-12 ">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                  placeholder="Last Name"
                />
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
                  type="text"
                  name="email"
                  id="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  placeholder="Email"
                />
              </div>
              <div className="col-12 ">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={this.state.phone}
                  onChange={this.handleChange}
                  placeholder="Phone Number"
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
              <div className="col-12 ">
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                  placeholder="Confirm Password"
                />
              </div>
              <div className="col-12">
                <ul className="actions">
                  <li>
                    <button onClick={this.handleSubmit}>Sign Up</button>
                  </li>
                </ul>
              </div>
              <div className="col-12">
                <span>
                  Already have an account? <Link to="/sign-in">Sign In</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { signUp })(SignUp);
