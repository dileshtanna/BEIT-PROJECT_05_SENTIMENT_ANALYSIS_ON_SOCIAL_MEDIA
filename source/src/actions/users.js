import axios from "axios"
import URL from "./serverURL"
import {
  GET_ALL_USERS,
  GET_USER_SCORE,
  GET_USER_POSTS,
  GET_NOTIFICATIONS
} from "./Types"
import { loadingStart, loadingStop } from "./loading"

export const getAllUsers = () => async dispatch => {
  dispatch(loadingStart())
  try {
    const result = await axios.get(URL + "/users/all")
    dispatch({
      type: GET_ALL_USERS,
      payload: result.data.data
    })
    dispatch(loadingStop())
  } catch (err) {
    dispatch(loadingStop())
    console.log(err)
  }
}

export const getUserPosts = username => async dispatch => {
  dispatch(loadingStart())
  try {
    const result = await axios.get(URL + "/users/posts/" + username)
    dispatch({
      type: GET_USER_POSTS,
      payload: result.data.data
    })
    dispatch(loadingStop())
  } catch (err) {
    dispatch(loadingStop())
    console.log(err)
  }
}

export const getUserScore = username => async dispatch => {
  dispatch(loadingStart())
  try {
    const result = await axios.get(URL + "/users/score/" + username)
    dispatch({
      type: GET_USER_SCORE,
      payload: result.data.data.score
    })
    dispatch(loadingStop())
  } catch (err) {
    dispatch(loadingStop())
    console.log(err)
  }
}

export const getNotifications = () => async dispatch => {
  try {
    const result = await axios.get(URL + "/notifications/")
    dispatch({
      type: GET_NOTIFICATIONS,
      payload: result.data.data
    })
  } catch (error) {
    console.log(error)
  }
}
