import React from "react";
import ReactDOM from "react-dom/client";

// instead of createStore, it is recommended to use the slightly more "advanced" function configureStore
import { createStore } from "redux";

// a reducer must be a pure function
const counterReducer = (state = 0, action: any) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "ZERO":
      return 0;
    default:
      return state;
  }
};

const store = createStore(counterReducer);

const App = () => {
  return (
    <div>
      {/*render value from the counter*/}
      <div>{store.getState()}</div>
      {/*action handlers of buttons dispatch the right actions to the store*/}
      <button onClick={(e) => store.dispatch({ type: "INCREMENT" })}>
        plus
      </button>
      <button onClick={(e) => store.dispatch({ type: "DECREMENT" })}>
        minus
      </button>
      <button onClick={(e) => store.dispatch({ type: "ZERO" })}>zero</button>
    </div>
  );
};

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById("root"));

// when the state in the store is changed react is not able to automatically rerender the app
// renderApp renders whole app to listen for changes in the store with store.subsrcibe()
const renderApp = () => {
  root.render(<App />);
};

// call renderApp immediately for first render
renderApp();
// renderApp renders whole app to listen for changes in the store with store.subsrcibe()
store.subscribe(renderApp);
