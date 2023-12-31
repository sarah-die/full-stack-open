import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

// const getId = () => (100000 * Math.random()).toFixed(0);

// 6.11
const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    // createAnecdote(state, action) {
    //   const anecdote = action.payload;
    //   console.log(anecdote);
    //   state.push({
    //     content: anecdote,
    //     votes: 0,
    //     id: getId(),
    //   });
    // },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    voteAnecdote(state, action) {
      // const id = action.payload;
      // const anecdoteToVote = state.find((a) => a.id === id);
      // const changedAnecdote = {
      //   ...anecdoteToVote,
      //   votes: anecdoteToVote.votes + 1,
      // };

      // 6.18
      const changedAnecdote = action.payload;
      return state.map((anecdote) =>
        anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote
      );
    },
    // set multiple anecdotes to redux
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { appendAnecdote, voteAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

// using thunks
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

// 6.18
export const voteAnecdoteThunk = (id) => async (dispatch, getState) => {
  const state = getState();
  const anecdoteToVote = state.anecdotes.find((a) => a.id === id);
  const changedAnecdote = {
    ...anecdoteToVote,
    votes: anecdoteToVote.votes + 1,
  };

  const updatedAnecdote = await anecdoteService.update(changedAnecdote, id);
  dispatch(voteAnecdote(updatedAnecdote));
};

export default anecdoteSlice.reducer;
