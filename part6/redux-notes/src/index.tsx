import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  // provide the store to all components
  // App is child of a Provider component
  <Provider store={store}>
    <App />
  </Provider>
);
