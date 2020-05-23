import axios from "axios"
import URL from "./serverURL"
import { CREATE_GROUP, GET_OWN_GROUPS } from "./Types"
import { loadingStart, loadingStop } from "./loading"

export const createGroup = (
  groupName,
  description,
  selectedParticipants,
  history
) => async dispatch => {
  dispatch(loadingStart())
  try {
    await axios.post(URL + "/groups/", {
      groupName,
      description,
      selectedParticipants
    })
    dispatch({
      type: CREATE_GROUP
    })
    dispatch(loadingStop())
    history.push("/new-post")
  } catch (err) {
    dispatch(loadingStop())
    console.log(err)
  }
}

export const getOwnGroups = () => async dispatch => {
  try {
    const res = await axios.get(URL + "/groups/self/")
    console.log(res.data.result)
    dispatch({
      type: GET_OWN_GROUPS,
      payload: res.data.result
    })
  } catch (err) {
    console.log(err)
  }
}
