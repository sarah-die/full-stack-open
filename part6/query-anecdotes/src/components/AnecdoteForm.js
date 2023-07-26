import { useMutation, useQueryClient } from "react-query";
import { createAnecdote } from "../requests";
import { useNotificationDispatch } from "../NotificationContext";
import { useRef } from "react";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  // 6.21
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData("anecdotes", anecdotes.concat(newAnecdote));
    },
    onError: () => {
      dispatch({
        type: "SET_NOTIFICATION",
        payload: "too short anecdote, must have length 5 or more",
      });
    },
  });

  const timeOutRef = useRef();

  const onCreate = (event) => {
    event.preventDefault();

    if (timeOutRef.current) clearTimeout(timeOutRef.current);
    timeOutRef.current = setTimeout(() => {
      dispatch({ type: "REMOVE" });
    }, 5000);

    dispatch({
      type: "CREATE",
      payload: event.target.anecdote.value,
    });
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    console.log("new anecdote");
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
