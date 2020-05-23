import { combineReducers } from "redux"
import auth from "./auth"
import users from "./users"
import posts from "./posts"
import search from "./search"
import groups from "./groups"

const appReducer = combineReducers({
  auth,
  posts,
  users,
  search,
  groups
})

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined
  }

  return appReducer(state, action)
}
export default rootReducer
