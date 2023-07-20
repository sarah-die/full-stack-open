import React from "react";
import ReactDOM from "react-dom/client";

import { createStore } from "redux";
import reducer, {toggleBad, toggleGood, toggleOk, toggleReset} from "./reducer";

const store = createStore(reducer);

const App = () => {
  const good = () => {
    store.dispatch(toggleGood());
  };
  const ok = () => {
    store.dispatch(toggleOk());
  };
  const bad = () => {
    store.dispatch(toggleBad());
  };
  const reset = () => {
    store.dispatch(toggleReset());
  };

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={ok}>ok</button>
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
