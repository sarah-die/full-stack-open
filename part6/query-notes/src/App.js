import { useMutation, useQuery, useQueryClient } from "react-query";
import { getNotes, createNote, updateNote } from "./requests";

const App = () => {
  const queryClient = useQueryClient();

  // create new note
  // parameter is function that uses Axios to send a new note to the server
  // successfull mutation: invalidateQueries is called -> automatically update a query with the key "notes" (see below)
  // i.e. fetch notes -> as a result app renders the up-to-date state on the server & added note is also rendered
  const newNoteMutation = useMutation(createNote, {
    onSuccess: (newNote) => {
      // queryClient.invalidateQueries("notes");
      // manually updating the query state
      const notes = queryClient.getQueryData("notes");
      queryClient.setQueryData("notes", notes.concat(newNote));
    },
  });

  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    // call the mutation objects function "mutate" and pass the new note as parameter
    newNoteMutation.mutate({ content, important: true });
  };

  const updateNoteMutation = useMutation(updateNote, {
    onSuccess: () => {
      queryClient.invalidateQueries("notes");
    },
  });

  const toggleImportance = (note) => {
    updateNoteMutation.mutate({ ...note, important: !note.important });
  };

  // axios call is wrapped in a query formed with useQuery function
  // no use of useEffect / useState
  const result = useQuery("notes", getNotes);
  console.log(result);

  const notes = result.data || [];

  return (
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map((note) => (
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content}
          <strong> {note.important ? "important" : ""}</strong>
        </li>
      ))}
    </div>
  );
};

export default App;
