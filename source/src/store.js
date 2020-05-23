//This module creates a redux store
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// Gets the root reducer from the below module to create the store
import rootReducer from "./reducers";

// The initial state is initialized as an empty object
const initialState = {};

const middleware = [thunk];
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware)
  // other store enhancers if any
);
// create a redux store and export it
const store = createStore(rootReducer, initialState, enhancer);

export default store;
