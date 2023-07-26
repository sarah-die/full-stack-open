import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

// export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data);
export const getAnecdotes = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

// export const createAnecdote = (newAnecdote) =>
//   axios.post(baseUrl, newAnecdote).then((res) => res.data);

export const createAnecdote = async (newAnecdote) => {
  const res = await axios.post(baseUrl, newAnecdote);
  return res.data;
};
