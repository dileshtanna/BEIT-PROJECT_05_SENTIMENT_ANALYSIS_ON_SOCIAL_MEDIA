import {
  GET_ALL_USERS,
  GET_USER_SCORE,
  GET_USER_POSTS,
  GET_NOTIFICATIONS
} from "../actions/Types"

const initialState = {
  users: [],
  posts: [],
  userScore: "",
  notifications: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload
      }
    case GET_USER_POSTS:
      return { ...state, posts: action.payload }
    case GET_NOTIFICATIONS:
      return { ...state, notifications: action.payload }
    case GET_USER_SCORE:
      return {
        ...state,
        userScore: action.payload
      }
    default:
      return state
  }
}
