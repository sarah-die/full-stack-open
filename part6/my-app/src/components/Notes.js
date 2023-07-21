import { useDispatch, useSelector } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";

// Note is not aware that handleClick dispatches an action
// -> these components are called presentational in react terminology
const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content}
      <strong> {note.important ? "important" : ""}</strong>
    </li>
  );
};

// container component
// = contains application logic: it defines what the event handlers of the Note components do
// and coordinates the configuration of presentational components
const Notes = () => {
  const dispatch = useDispatch();
  // useSelector hook: access the notes stored in the store
  const notes = useSelector((state) => state);

  return (
    <ul>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          handleClick={() => dispatch(toggleImportanceOf(note.id))}
        />
      ))}
    </ul>
  );
};

export default Notes;
