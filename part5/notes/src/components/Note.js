const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'make not important' : 'make important';

  // classname can be used to access the component in tests
  return (
    <li className="note">
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};

export default Note;
