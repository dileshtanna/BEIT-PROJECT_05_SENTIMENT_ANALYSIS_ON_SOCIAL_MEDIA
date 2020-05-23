import {
  GET_ALL_POSTS,
  CREATE_POST,
  GET_OWN_POSTS,
  LIKE_UNLIKE_POST,
  GET_SINGLE_POST
} from "../actions/Types"

const initialState = {
  posts: [],
  post: {},
  score: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POSTS:
      return {
        ...state,
        posts: action.payload
      }
    case GET_OWN_POSTS:
      return { ...state, posts: action.payload }
    case GET_SINGLE_POST:
      return { ...state, post: action.payload }
    case CREATE_POST:
      return { ...state, score: action.payload }
    case LIKE_UNLIKE_POST:
      return state
    default:
      return state
  }
}
