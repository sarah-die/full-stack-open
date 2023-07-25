import { useDispatch, useSelector } from "react-redux";
import { voteAnecdoteThunk } from "../reducers/anecdoteReducer";
import { displayNotification } from "../reducers/notificationReducer";

const AnecdotesList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === "ALL") {
      return anecdotes;
    }
    return anecdotes.filter((anec) =>
      anec.content.toLowerCase().includes(filter.toLowerCase())
    );
  });

  // const timeOutRef = useRef();

  const vote = (id) => {
    const votedAnecdote = anecdotes.find((anec) => anec.id === id);
    dispatch(voteAnecdoteThunk(id));

    dispatch(
      displayNotification(`You voted for "${votedAnecdote.content}"`, 5)
    );
    // if (timeOutRef.current) clearTimeout(timeOutRef.current);
    // timeOutRef.current = setTimeout(() => {
    //   dispatch(removeNotification(""));
    // }, 5000);
  };

  return (
    <div>
      {anecdotes
        .slice()
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdotesList;
