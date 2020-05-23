import axios from "axios";
import URL from "./serverURL";
import { GET_SEARCH_RESULTS } from "./Types";

export const search = query => async dispatch => {
  try {
    const res = await axios.get(URL + "/search?query=" + query);
    dispatch({
      type: GET_SEARCH_RESULTS,
      payload: res.data.data
    });
  } catch (e) {
    console.log(e);
  }
};
