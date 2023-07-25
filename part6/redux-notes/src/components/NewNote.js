import { useDispatch } from "react-redux";
import { createNote } from "../reducers/noteReducer";

const NewNote = () => {
  // dispatch hook: provides any React component access to the dispatch function of the Redux store defined in index.js
  const dispatch = useDispatch();

  const addNote = async (event) => {
    event.preventDefault();
    // access content from uncontrolled form
    const content = event.target.note.value;
    event.target.note.value = "";

    // getting data with server
    // const newNote = await noteService.createNew(content);
    // dispatch(createNote(newNote));

    // replaced with thunk
    dispatch(createNote(content));
  };

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  );
};

export default NewNote;
