import { createSlice } from "@reduxjs/toolkit";
import noteService from "../services/notes";

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

// name = defines the prefix which is used in the action's type values
// e.g. createNote action will have type notes/createNote
// reducers = takes reducer itself as an object
// reducer function handle state changes caused by certain actions
const noteSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
    // replaced by thunk
    // createNote(state, action) {
    //   state.push(action.payload);
    // },
    toggleImportanceOf(state, action) {
      const id = action.payload;
      const noteToChange = state.find((n) => n.id === id);
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      };

      console.log(JSON.parse(JSON.stringify(state)));
      return state.map((note) => (note.id !== id ? note : changedNote));
    },
    appendNote(state, action) {
      state.push(action.payload);
    },
    // for multiple notes in an array
    setNotes(state, action) {
      return action.payload;
    },
  },
});

export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions;

// action creator to initialize notes based on data received from server
// fetch notes from server -> dispatch setNotes action to add them to the store
export const initializeNotes = () => {
  return async (dispatch) => {
    const notes = await noteService.getAll();
    dispatch(setNotes(notes));
  };
};

export const createNote = (content) => {
  return async (dispatch) => {
    const newNote = await noteService.createNew(content);
    dispatch(appendNote(newNote));
  };
};

export default noteSlice.reducer;
