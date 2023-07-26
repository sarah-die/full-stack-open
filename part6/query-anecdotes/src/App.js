import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery } from "react-query";
import { getAnecdotes } from "./requests";

const App = () => {
  const handleVote = (anecdote) => {
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
