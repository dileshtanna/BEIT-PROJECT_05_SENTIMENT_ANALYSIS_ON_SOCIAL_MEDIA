import { LOADING_START, LOADING_STOP } from "./Types";

export const loadingStart = () => dispatch => {
  dispatch({
    type: LOADING_START
  });
};

export const loadingStop = () => dispatch => {
  dispatch({
    type: LOADING_STOP
  });
};
