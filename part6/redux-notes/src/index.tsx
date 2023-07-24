import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import App from "./App";
import noteReducer from "./reducers/noteReducer";
import filterReducer from "./reducers/filterReducer";

// combined reducers: every action gets handled in every part of it
const store = configureStore({
  reducer: { notes: noteReducer, filter: filterReducer },
});

// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  // provide the store to all components
  // App is child of a Provider component
  <Provider store={store}>
    <App />
  </Provider>
);
