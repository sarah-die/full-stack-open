const initialState = [
  {
    content: "reducer defines how redux store works",
    important: true,
    id: 1,
  },
  {
    content: "state of store can contain any data",
    important: false,
    id: 2,
  },
];

// a reducer must be a pure function
// A reducer state must be composed of immutable objects
// (= If there is a change in the state, the old object is not changed, but it is replaced with a new, changed, object)
const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW_NOTE":
      // return state.concat(action.payload);
      return [...state, action.payload];
    case "TOGGLE_IMPORTANCE": {
      const id = action.payload.id;
      const noteToChange = state.find((n) => n.id === id);
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      };
      return state.map((note) => (note.id !== id ? note : changedNote));
    }
    default:
      return state;
  }
};

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

// React components don't need to know the Redux actions types and forms -> can be separated
// action creator = functions that create actions
export const createNote = (content) => {
  return {
    type: "NEW_NOTE",
    payload: {
      content,
      important: false,
      id: generateId(),
    },
  };
};

export const toggleImportanceOf = (id) => {
  return {
    type: "TOGGLE_IMPORTANCE",
    payload: { id },
  };
};

// noteReducer as defautl export/ action creator as normal export
export default noteReducer;
