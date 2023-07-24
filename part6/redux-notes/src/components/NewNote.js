import { useDispatch } from "react-redux";
import { createNote } from "../reducers/noteReducer";

const NewNote = () => {
  // dispatch hook: provides any React component access to the dispatch function of the Redux store defined in index.js
  const dispatch = useDispatch();

  const addNote = (event) => {
    event.preventDefault();
    // access content from uncontrolled form
    const content = event.target.note.value;
    event.target.note.value = "";

    // dispatch the action for adding new notes without react-redux
    // store.dispatch({
    //     type: 'NEW_NOTE',
    //     payload: {
    //         content,
    //         important: false,
    //         id: generateId()
    //     }
    // })

    // React components don't need to know the Redux actions types and forms -> can be separated
    // component just calls the creator functions
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
