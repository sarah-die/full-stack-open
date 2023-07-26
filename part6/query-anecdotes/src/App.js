import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getAnecdotes, updateAnecdote } from "./requests";
import { useNotificationDispatch } from "./NotificationContext";
import { useRef } from "react";

const App = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  // 6.22
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
  });

  const timeOutRef = useRef();

  const handleVote = (anecdote) => {
    if (timeOutRef.current) clearTimeout(timeOutRef.current);
    timeOutRef.current = setTimeout(() => {
      dispatch({ type: "REMOVE" });
    }, 5000);

    dispatch({ type: "VOTE", payload: anecdote.content });
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    console.log("vote");
  };

  // 6.20
  const result = useQuery("anecdotes", getAnecdotes, { retry: false });
  console.log(result);

  // or: result.isError
  if (result.status === "error") {
    return <div>Anecdote service not available due to problems in server</div>;
  }

  const anecdotes = result.data || [];

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
