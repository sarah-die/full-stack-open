import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { displayNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  // const timeOutRef = useRef();

  const addAnecdote = async (event) => {
    event.preventDefault();

    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    // now using Thunk
    // const newAnecdote = await anecdoteService.createNew(content);
    dispatch(createAnecdote(content));

    dispatch(displayNotification(`New anecdote: ${content}`, 5));
    // dispatch(setNotification(`New anecdote: ${content}`));
    // if (timeOutRef.current) clearTimeout(timeOutRef.current);
    // timeOutRef.current = setTimeout(() => {
    //   dispatch(removeNotification(""));
    // }, 5000);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
