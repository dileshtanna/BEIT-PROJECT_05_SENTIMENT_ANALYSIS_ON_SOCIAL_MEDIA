import React, { Component } from "react"
import { connect } from "react-redux"
import { getOwnGroups } from "../../actions/groups"
import { Link } from "react-router-dom"
import JwtDecode from "jwt-decode"
export class Dashboard extends Component {
  state = {
    selectedGroup: {},
    query: ""
  }
  componentDidMount() {
    const { history } = this.props
    const token = localStorage.getItem("token")
    if (!token) history.push("/sign-in")
    if (!JwtDecode(token).isAdmin) history.push("/")
    else {
      this.props.getOwnGroups()
    }
  }
  selectGroup = id => {
    this.setState({ selectedGroup: id })
  }
  render() {
    const generateGroup = group => (
      <div
        className="row gtr-50"
        onClick={() => this.selectGroup(group)}
        style={{ marginTop: "20px", marginBottom: "29=0px" }}>
        <div
          style={{
            border:
              this.state.selectedGroup._id === group._id
                ? "1px solid #1987cb"
                : "1px solid #e2e2e2",
            padding: "20px",
            minWidth: "200px",
            maxWidth: "200px"
          }}
          className="col">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between"
            }}>
            <h3>{group.name}</h3>
            <div>
              <span style={{ padding: "5px", marginLeft: "30px" }}>
                {group.selected_participants.length}
              </span>
              <i class="fa fa-users" aria-hidden="true"></i>
            </div>
          </div>
          <span>{group.description}</span>
        </div>
      </div>
    )

    const generateParticipants = participant => (
      <div className="meta">
        <div className="post">
          <Link
            to={{ pathname: "/user", state: { user: participant } }}
            className="author">
            <span className="name">{participant}</span>
            <img src="images/avatar.jpg" alt="" />
          </Link>
        </div>
      </div>
    )
    const { groups } = this.props
    return (
      <div style={{ width: "100%", height: "100%" }} className="post">
        <div className="box alt">
          <div className="row gtr-uniform">
            <div className="post">
              <div className="title">
                <h2>
                  {" "}
                  <u>Your GROUPS</u>{" "}
                </h2>
              </div>
              {groups && groups.length > 0
                ? groups.map(g => <div className="col">{generateGroup(g)}</div>)
                : "Nothing to show here! Create a group"}
            </div>

            <div className="post" style={{ marginLeft: "20%", width: "450px" }}>
              <div className="title">
                <h2>
                  <u>
                    {this.state.selectedGroup.name
                      ? `Participants in ${this.state.selectedGroup.name}`
                      : "Participants"}
                  </u>
                </h2>

                {this.state.selectedGroup.name ? (
                  <div className="search">
                    <input
                      style={{ marginBottom: "20px" }}
                      value={this.state.query}
                      type="text"
                      onChange={e => this.setState({ query: e.target.value })}
                      name="query"
                      placeholder="Search"
                    />
                  </div>
                ) : null}
              </div>
              {this.state.selectedGroup._id
                ? this.state.selectedGroup.selected_participants.length > 0
                  ? this.state.selectedGroup.selected_participants.map(p => {
                      if (this.state.query !== "")
                        if (p.includes(this.state.query))
                          return generateParticipants(p)
                        else return null
                      return generateParticipants(p)
                    })
                  : "No participants in this group"
                : "Please select a group first"}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  groups: state.groups.groups
})

export default connect(mapStateToProps, { getOwnGroups })(Dashboard)
