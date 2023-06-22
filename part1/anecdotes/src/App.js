import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}> {text} </button>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));
  const [mostVoted, setMostVoted] = useState(-1);

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleNewAnecdoteClick = () => {
    const temp = getRandomInt(0, anecdotes.length - 1);
    setSelected(temp);
  };

  const handleVoteClick = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
    calcMostVotes(copy);
  };

  const calcMostVotes = (copy) => {
    const max = Math.max(...copy);
    const index = copy.indexOf(max);
    setMostVoted(index);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]} <br />
      <div>This anecdote has {points[selected]} votes.</div>
      <Button handleClick={handleVoteClick} text={"vote"} />
      <Button handleClick={handleNewAnecdoteClick} text={"random anecdote"} />
      <h1>Anecdote with most votes</h1>
      {mostVoted === -1 ? (
        <div>No votes yet</div>
      ) : (
        <div>
          {anecdotes[mostVoted]} <br /> It has {points[mostVoted]} votes.
        </div>
      )}
    </div>
  );
};

export default App;
