import axios from "axios"
import URL from "./serverURL"
import {
  CREATE_POST,
  GET_OWN_POSTS,
  GET_ALL_POSTS,
  LIKE_UNLIKE_POST,
  GET_SINGLE_POST
} from "./Types"
import { loadingStart, loadingStop } from "./loading"
import { getNotifications } from "./users"

export const getAllPosts = () => async dispatch => {
  dispatch(loadingStart())
  try {
    const result = await axios.get(URL + "/posts/all")
    dispatch({
      type: GET_ALL_POSTS,
      payload: result.data.data
    })
    dispatch(loadingStop())
  } catch (err) {
    dispatch(loadingStop())
    console.log(err)
  }
}

export const getSinglePost = id => async dispatch => {
  dispatch(loadingStart())
  try {
    const result = await axios.get(URL + "/posts/one/" + id)
    dispatch({
      type: GET_SINGLE_POST,
      payload: result.data.data
    })
  } catch (error) {
    console.log(error)
  }
}

export const createPost = (
  postTitle,
  post,
  selectedParticipants,
  compulsoryAction,
  shareToGroup,
  history
) => async dispatch => {
  dispatch(loadingStart())
  try {
    const group = shareToGroup ? shareToGroup._id : null
    const result = await axios.post(URL + "/posts/new", {
      post,
      postTitle,
      selectedParticipants,
      compulsoryAction,
      group
    })
    history.push("/")
    dispatch({
      type: CREATE_POST,
      payload: result.data.score
    })
    dispatch(loadingStop())
  } catch (err) {
    dispatch(loadingStop())
    console.log(err)
  }
}

export const getOwnPosts = () => async dispatch => {
  dispatch(loadingStart())
  try {
    const result = await axios.get(URL + "/posts/all/user")
    dispatch({
      type: GET_OWN_POSTS,
      payload: result.data.data
    })
    dispatch(loadingStop())
  } catch (err) {
    dispatch(loadingStop())
    console.log(err)
  }
}

export const performLikeAction = (
  id,
  secondActionToDispatch,
  username = "",
  getSinglePostTrue = false
) => async dispatch => {
  try {
    await axios.put(URL + "/posts/like/" + id)
    dispatch({
      type: LIKE_UNLIKE_POST
    })
    dispatch(getNotifications())
    if (getSinglePostTrue) dispatch(getSinglePost(secondActionToDispatch))
    else dispatch(secondActionToDispatch(username))
  } catch (err) {
    console.log(err)
  }
}
