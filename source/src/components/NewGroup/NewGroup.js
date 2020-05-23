import React, { Component } from "react"
import { connect } from "react-redux"
import { createGroup } from "../../actions/groups"
import { search } from "../../actions/search"
import JwtDecode from "jwt-decode"

export class NewPost extends Component {
  state = {
    groupName: "",
    description: "",
    searchQuery: "",
    selectedParticipants: []
  }
  componentDidMount() {
    const { history } = this.props
    const token = localStorage.getItem("token")
    if (!token) history.push("/sign-in")
    if (!JwtDecode(token).isAdmin) history.push("/")
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = () => {
    const { createGroup, history } = this.props
    const { groupName, description, selectedParticipants } = this.state
    let selectedParticipantsUsernames = []
    selectedParticipants.map(sp => {
      selectedParticipantsUsernames.push(sp.username)
    })
    createGroup(groupName, description, selectedParticipantsUsernames, history)
  }

  makeActionCompulsory = () => {
    this.setState({ compulsoryAction: !this.state.compulsoryAction })
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
      this.setState({ selectedParticipants })
    }
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
      groupName,
      description,
      selectedParticipants
    } = this.state
    const { searchResults } = this.props
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
                      width: "20px",
                      height: "20px"
                    }}
                  />
                </a>
                <span
                  style={{ marginLeft: 10 }}>{`${firstName} ${lastName}`}</span>
              </div>
              <div className="col-12 ">
                <input
                  type="text"
                  name="groupName"
                  id="groupName"
                  value={groupName}
                  onChange={this.handleChange}
                  placeholder="Group Name"
                />
              </div>

              <div className="col-12">
                <textarea
                  name="description"
                  id="description"
                  placeholder="Describe Your Group"
                  value={description}
                  onChange={this.handleChange}
                  rows="6"></textarea>
              </div>
              <div className="search col-12 col-12-small">
                {/* <form id="search" method="get" action="#"> */}
                <input
                  type="text"
                  onChange={this.handleSearch}
                  name="query"
                  value={searchQuery}
                  placeholder="Search"
                />
                {/* </form> */}
              </div>

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
              <div className="col-12">
                <ul className="actions">
                  <li>
                    <button onClick={this.handleSubmit}>CREATE</button>
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
  searchResults: state.search.results
})

export default connect(mapStateToPros, { createGroup, search })(NewPost)
