import { createStore } from "redux";

// a reducer must be a pure function
// A reducer state must be composed of immutable objects
// (= If there is a change in the state, the old object is not changed, but it is replaced with a new, changed, object)
const noteReducer = (state = [], action: any) => {
  if (action.type === "NEW_NOTE") {
    state.concat(action.payload);
    return state;
  }

  return state;
};

const store = createStore(noteReducer);

store.dispatch({
  type: "NEW_NOTE",
  payload: {
    content: "the app state is in redux store",
    important: true,
    id: 1,
  },
});

store.dispatch({
  type: "NEW_NOTE",
  payload: {
    content: "state changes are made with actions",
    important: false,
    id: 2,
  },
});

const App = () => {
  return (
    <div>
      <ul>
        {store.getState().map((note) => (
          <li key={note.id}>
            {note.content} <strong>{note.important ? "important" : ""}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};
