import React from "react";
import ReactDOM from "react-dom/client";

import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";

import App from "./App";
import noteReducer from "./reducers/noteReducer";
import filterReducer from "./reducers/filterReducer";

// combined reducers: every action gets handled in every part of it
const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
});

const store = createStore(reducer);

// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  // provide the store to all components
  // App is child of a Provider component
  <Provider store={store}>
    <App />
  </Provider>
);
