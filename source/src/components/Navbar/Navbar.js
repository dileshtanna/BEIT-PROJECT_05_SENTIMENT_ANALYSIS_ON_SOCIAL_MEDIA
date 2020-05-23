import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { logout } from "../../actions/auth"
import JwtDecode from "jwt-decode"
import { getNotifications } from "../../actions/users"

const jQuery = window.$
const breakpoints = window.breakpoints

export class Navbar extends Component {
  componentDidMount() {
    ;(function($) {
      var $window = $(window),
        $body = $("body"),
        $menu = $("#menu"),
        $sidebar = $("#sidebar"),
        $main = $("#main")

      // Breakpoints.
      breakpoints({
        xlarge: ["1281px", "1680px"],
        large: ["981px", "1280px"],
        medium: ["737px", "980px"],
        small: ["481px", "736px"],
        xsmall: [null, "480px"]
      })

      // Play initial animations on page load.
      $window.on("load", function() {
        window.setTimeout(function() {
          $body.removeClass("is-preload")
        }, 100)
      })

      // Menu.
      $menu.appendTo($body).panel({
        delay: 500,
        hideOnClick: true,
        hideOnSwipe: true,
        resetScroll: true,
        resetForms: true,
        side: "right",
        target: $body,
        visibleClass: "is-menu-visible"
      })

      // Search (header).
      var $search = $("#search"),
        $search_input = $search.find("input")

      $body.on("click", '[href="#search"]', function(event) {
        event.preventDefault()

        // Not visible?
        if (!$search.hasClass("visible")) {
          // Reset form.
          $search[0].reset()

          // Show.
          $search.addClass("visible")

          // Focus input.
          $search_input.focus()
        }
      })

      $search_input
        .on("keydown", function(event) {
          if (event.keyCode == 27) $search_input.blur()
        })
        .on("blur", function() {
          window.setTimeout(function() {
            $search.removeClass("visible")
          }, 100)
        })

      // Intro.
      var $intro = $("#intro")

      // Move to main on <=large, back to sidebar on >large.
      breakpoints.on("<=large", function() {
        $intro.prependTo($main)
      })

      breakpoints.on(">large", function() {
        $intro.prependTo($sidebar)
      })
    })(jQuery)
    this.props.getNotifications()
  }
  handleLogout = () => {
    const { logout } = this.props
    logout()
  }
  render() {
    let token, firstName, lastName, isAdmin
    if (this.props.token) {
      token = this.props.token
      const decoded = JwtDecode(token)
      firstName = decoded.firstName
      lastName = decoded.lastName
      isAdmin = decoded.isAdmin
    } else if (localStorage.getItem("token")) {
      token = localStorage.getItem("token")
      const decoded = JwtDecode(token)
      isAdmin = decoded.isAdmin
      firstName = decoded.firstName
      lastName = decoded.lastName
    }
    const { notifications } = this.props
    return (
      <div>
        {/* <!-- Header --> */}
        <header id="header">
          <h1>
            <Link to="/">APSIT</Link>
          </h1>
          {token ? (
            <>
              <nav className="links">
                <ul>
                  <li>
                    <Link to="/">HOME</Link>
                  </li>
                  <li>
                    <Link to="/new-post">NEW POST</Link>
                  </li>
                  {isAdmin ? (
                    <li>
                      <Link to="/new-group">NEW GROUP</Link>
                    </li>
                  ) : null}
                  <li>
                    <Link to="/profile">PROFILE</Link>
                  </li>
                  {isAdmin ? (
                    <li>
                      <Link to="/dashboard">DASHBOARD</Link>
                    </li>
                  ) : null}
                  {isAdmin ? (
                    <li>
                      <Link to="/notify">BULK NOTIFICATIONS</Link>
                    </li>
                  ) : null}
                  {/* <li>
                    <Link to="#">ABOUT</Link>
                  </li> */}
                  <li>
                    <Link to="#" onClick={this.handleLogout}>
                      Log OUT
                    </Link>
                  </li>
                  <li>
                    <span>{`${firstName} ${lastName}`}</span>
                  </li>
                  <li>
                    {/* <div class="box"> */}
                    <a className="button" href="#notifications">
                      <i
                        style={{ fontSize: "20px" }}
                        className="fa fa-bell"
                        aria-hidden="true">
                        {notifications.length}
                      </i>
                    </a>
                    {/* </div> */}

                    <div id="notifications" className="overlay">
                      <div className="popup">
                        <h2>Notifications</h2>
                        <a
                          style={{ fontSize: "40px" }}
                          className="close"
                          href="#">
                          &times;
                        </a>
                        {notifications.length > 0
                          ? notifications.map(n =>
                              n._id ? (
                                <div
                                  style={{
                                    border: "1px solid #e2e2e2",
                                    marginBottom: "2px",
                                    padding: "5px",
                                    height: "auto",
                                    cursor: "pointer"
                                  }}
                                  className="content">
                                  {` NOTIFICATION : ${n.message}`}
                                </div>
                              ) : (
                                <Link to={"/post/" + n}>
                                  <div
                                    style={{
                                      border: "1px solid #e2e2e2",
                                      marginBottom: "2px",
                                      padding: "5px",
                                      height: "auto",
                                      cursor: "pointer"
                                    }}
                                    className="content">
                                    A post requires your action. Click here to
                                    view it.
                                  </div>
                                </Link>
                              )
                            )
                          : "No Notifications"}
                      </div>
                    </div>
                  </li>
                </ul>
              </nav>
              <nav className="main">
                <ul>
                  <li className="search">
                    <a className="fa-search" href="#search">
                      Search
                    </a>
                    <form id="search" method="get" action="#">
                      <input type="text" name="query" placeholder="Search" />
                    </form>
                  </li>
                  <li className="menu">
                    <a className="fa-bars" href="#menu">
                      Menu
                    </a>
                  </li>
                </ul>
              </nav>
            </>
          ) : null}
        </header>

        {/* <!-- Menu --> */}
        <section id="menu">
          {/* <!-- Search --> */}
          <section>
            <form className="search" method="get" action="#">
              <input type="text" name="query" placeholder="Search" />
            </form>
          </section>

          {/* <!-- Links --> */}
          <section>
            <ul className="links">
              <li>
                <Link to="/">
                  <h3>FEED</h3>
                  <p>CHECKOUT WHAT YOUR FRIENDS ARE UPTO</p>
                </Link>
              </li>
              <li>
                <Link to="/new-post">
                  <h3>NEW POST</h3>
                  <p>SHARE YOUR VIEWS ABOUT THE WORLD</p>
                </Link>
              </li>
              <li>
                <Link to="#">
                  <h3>PROFILE</h3>
                  <p>MANAGE WHAT OTHERS SEE IN YOU</p>
                </Link>
              </li>
              <li>
                <Link to="/dashboard">
                  <h3>DASHBOARD</h3>
                  <p>REAL TIME STATS ON EVERYTHING AROUND YOU</p>
                </Link>
              </li>
              <li>
                <Link to="#">
                  <h3>ABOUT</h3>
                  <p>WANNA KNOW MORE ABOUT US?</p>
                </Link>
              </li>
              <li>
                <Link to="#" onClick={this.handleLogout}>
                  <h3>LOGOUT</h3>
                  <p>ARE YOU LEAVING US?</p>
                </Link>
              </li>
            </ul>
          </section>

          {/* <!-- Actions --> */}
          {/* <section>
            <ul className="actions stacked">
              <li>
                <button
                  onClick={this.handleLogout}
                  className="button large fit"
                >
                  Log OUT
                </button>
              </li>
            </ul>
          </section> */}
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  notifications: state.users.notifications
})

export default connect(mapStateToProps, { logout, getNotifications })(Navbar)
