import { LOGIN, SIGN_UP, LOGOUT, CREATE_POST } from "../actions/Types";

const initialState = {
  token: null,
  scoreOfLoggedInUser: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.payload,
        scoreOfLoggedInUser: action.score
      };
    case SIGN_UP:
      return state;
    case LOGOUT:
      return {
        ...state,
        token: null,
        scoreOfLoggedInUser: 0
      };
    case CREATE_POST:
      return { ...state, scoreOfLoggedInUser: action.payload };
    default:
      return state;
  }
};
