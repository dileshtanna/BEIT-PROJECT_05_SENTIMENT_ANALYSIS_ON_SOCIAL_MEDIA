import React, { Component } from "react"
import { connect } from "react-redux"
import { search } from "../../actions/search"
import { getOwnGroups } from "../../actions/groups"
import { createMessage } from "../../actions/messages"
import JwtDecode from "jwt-decode"

export class NewPost extends Component {
  state = {
    notification: "",
    selectedParticipants: [],
    broadcast: true,
    shareToGroup: {}
  }
  componentDidMount() {
    const { history } = this.props
    const token = localStorage.getItem("token")
    if (!token) history.push("/sign-in")
    if (!JwtDecode(token).isAdmin) history.push("/")

    this.props.getOwnGroups()
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = () => {
    const { createMessage, history } = this.props
    const {
      notification,
      selectedParticipants,
      broadcast,
      shareToGroup
    } = this.state
    let selectedParticipantsUsernames = []
    selectedParticipants.map(sp => {
      selectedParticipantsUsernames.push(sp.username)
    })
    createMessage(
      notification,
      selectedParticipantsUsernames,
      shareToGroup._id ? shareToGroup._id : null,
      broadcast,
      history
    )
  }

  handleSearch = e => {
    const { value } = e.target
    this.setState({ searchQuery: value })
    if (value === "") return
    this.props.search(value)
  }

  selectParticipants = (e, selected) => {
    const { checked } = e.target
    let { selectedParticipants } = this.state
    console.log(checked)
    if (checked) {
      console.log("check")
      this.setState(prevState => ({
        ...prevState,
        selectedParticipants: [...prevState.selectedParticipants, selected]
      }))
    } else {
      selectedParticipants = selectedParticipants.filter(
        p => p.username !== selected.username
      )
      console.log(selectedParticipants)
      this.setState({
        selectedParticipants,
        broadcast: selectedParticipants.length > 0 ? true : false
      })
    }
  }
  selectGroups = (e, group) => {
    const { checked } = e.target
    if (checked) this.setState({ shareToGroup: group, broadcast: false })
    else this.setState({ shareToGroup: {} })
  }
  render() {
    const token = localStorage.getItem("token")
    let firstName, lastName
    if (token) {
      const decoded = JwtDecode(token)
      firstName = decoded.firstName
      lastName = decoded.lastName
    }
    const {
      searchQuery,
      notification,
      selectedParticipants,
      broadcast
    } = this.state
    const { searchResults, groups } = this.props
    console.log(groups)
    return (
      <div style={{ margin: "auto" }}>
        <div className="col-8">
          <div className="post">
            <div className="row gtr-uniform">
              <div className="meta" style={{}}>
                <a>
                  <img
                    src="https://www.oneworldplayproject.com/wp-content/uploads/2016/03/avatar-1024x1024.jpg"
                    alt=""
                    style={{
                      borderRadius: "100%",
                      height: "20px",
                      width: "20px"
                    }}
                  />
                </a>
                <span
                  style={{
                    marginLeft: 10
                  }}>{`${firstName} ${lastName}`}</span>
              </div>

              <div className="col-12">
                <textarea
                  name="notification"
                  id="notification"
                  placeholder="What is the message?"
                  value={notification}
                  onChange={this.handleChange}
                  rows="6"></textarea>
              </div>
              <div className="search col-12 col-12-small">
                <div className="col-12">
                  <input
                    onChange={() => this.setState({ broadcast: !broadcast })}
                    type="checkbox"
                    id={"broadcast"}
                    name={"broadcast"}
                    checked={this.state.broadcast}
                  />
                  <label for={"broadcast"}>{`Broadcast Message`}</label>
                </div>
                <div className="row">
                  {!broadcast &&
                    groups.length > 0 &&
                    groups.map(g => (
                      <div id="people">
                        <input
                          checked={
                            this.state.shareToGroup.name === g.name
                              ? true
                              : false
                          }
                          onChange={e => this.selectGroups(e, g)}
                          type="checkbox"
                          id={g.name}
                          name={g.name}
                        />
                        <label for={g.name}>{g.name}</label>
                      </div>
                    ))}
                </div>
                {/* <form id="search" method="get" action="#"> */}
                {broadcast ? null : this.state.shareToGroup.name ? null : (
                  <input
                    type="text"
                    onChange={this.handleSearch}
                    name="query"
                    value={searchQuery}
                    placeholder="Select participants to share with"
                  />
                )}
                {/* </form> */}
              </div>

              {this.state.shareToGroup.name ? null : (
                <div className="row gtr-uniform">
                  {selectedParticipants.map(sp => (
                    <div id="people" className="col-4 col-4-small">
                      <input
                        checked
                        onChange={e => this.selectParticipants(e, sp)}
                        type="checkbox"
                        id={sp.username}
                        name={sp.username}
                      />
                      <label
                        for={
                          sp.username
                        }>{`${sp.first_name} ${sp.last_name}`}</label>
                    </div>
                  ))}

                  {searchQuery
                    ? searchResults.map(sr => {
                        if (
                          selectedParticipants.filter(
                            sp => sp.username === sr.username
                          ).length > 0
                        )
                          return null
                        return (
                          <div id="people" className="col-4 col-4-small">
                            <input
                              onChange={e => this.selectParticipants(e, sr)}
                              type="checkbox"
                              id={sr.username}
                              name={sr.username}
                            />
                            <label
                              for={
                                sr.username
                              }>{`${sr.first_name} ${sr.last_name}`}</label>
                          </div>
                        )
                      })
                    : null}
                </div>
              )}

              <div className="col-12">
                <ul className="actions">
                  <li>
                    <button onClick={this.handleSubmit}>POST</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToPros = state => ({
  searchResults: state.search.results,
  groups: state.groups.groups
})

export default connect(mapStateToPros, { createMessage, search, getOwnGroups })(
  NewPost
)
