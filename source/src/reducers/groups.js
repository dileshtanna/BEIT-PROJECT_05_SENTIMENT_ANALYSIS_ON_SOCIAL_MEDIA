import { CREATE_GROUP, GET_OWN_GROUPS } from "../actions/Types"

const initialState = {
  groups: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_OWN_GROUPS:
      return {
        ...state,
        groups: action.payload
      }
    case CREATE_GROUP:
      return state
    default:
      return state
  }
}
