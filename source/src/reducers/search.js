import { GET_SEARCH_RESULTS } from "../actions/Types";

const initialState = {
  results: []
};

export default (state = initialState, action) => {
  if (action.type === GET_SEARCH_RESULTS) {
    return {
      ...state,
      results: action.payload
    };
  } else return state;
};
