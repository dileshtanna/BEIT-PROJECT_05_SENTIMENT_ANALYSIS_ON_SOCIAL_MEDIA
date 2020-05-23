import axios from "axios";
import URL from "./serverURL";
import { LOGIN, SIGN_UP, LOGOUT } from "./Types";
import { loadingStart, loadingStop } from "./loading";
import jwtDecode from "jwt-decode";
import App from "../App";

export const login = (username, password, history) => async (dispatch) => {
  dispatch(loadingStart());
  try {
    const result = await axios.post(URL + "/login/", { username, password });
    const { token } = result.data;
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    console.log(decoded);
    dispatch({
      type: LOGIN,
      payload: token,
      score: decoded.score,
    });
    dispatch(loadingStop());
    App();
    window.location.reload();
    // history.push("/");
  } catch (err) {
    dispatch(loadingStop());
    console.log(err);
  }
};

export const signUp = (
  firstName,
  lastName,
  username,
  password,
  email,
  phone,
  history
) => async (dispatch) => {
  dispatch(loadingStart());
  try {
    await axios.post(URL + "/sign-up", {
      firstName,
      lastName,
      username,
      password,
      email,
      phone,
    });
    dispatch({
      type: SIGN_UP,
    });
    dispatch(loadingStop());
    history.push("/sign-in");
  } catch (err) {
    dispatch(loadingStop());
    console.log(err);
  }
};

export const logout = () => (dispatch) => {
  dispatch(loadingStart());
  localStorage.removeItem("token");
  window.location.reload();
  // history.push("/sign-in");
  App();
  dispatch({ type: LOGOUT });
  dispatch(loadingStop());
};
