import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useQueryClient } from "react-query";
import { getAnecdotes } from "./requests";

const App = () => {
  const queryClient = useQueryClient();

  const handleVote = (anecdote) => {
    console.log("vote");
  };

  const result = useQuery("anecdotes", getAnecdotes, { retry: false });
  console.log(result);

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
