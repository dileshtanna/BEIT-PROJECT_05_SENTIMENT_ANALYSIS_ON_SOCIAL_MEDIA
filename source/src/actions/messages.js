import axios from "axios"
import URL from "./serverURL"
import { CREATE_MESSAGE } from "./Types"

export const createMessage = (
  message,
  selectedParticipants,
  group,
  broadcast,
  history
) => async dispatch => {
  try {
    await axios.post(URL + "/messages/", {
      message,
      selectedParticipants,
      group,
      broadcast
    })
    dispatch({
      type: CREATE_MESSAGE
    })
    history.push("/")
  } catch (error) {
    console.log(error)
  }
}
