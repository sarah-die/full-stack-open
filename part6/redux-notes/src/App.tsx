import { useEffect } from "react";
import NewNote from "./components/NewNote";
import Notes from "./components/Notes";
import VisibilityFilter from "./components/VisibilityFilter";

import { useDispatch } from "react-redux";
import { initializeNotes } from "./reducers/noteReducer";

const App = () => {
  const dispatch = useDispatch();

  // useEffect to fetch data from server
  // append initial state to store
  // useEffect(() => {
  //   noteService.getAll().then((notes) => dispatch(setNotes(notes)));
  // }, [dispatch]);

  // with Redux Thunk
  useEffect(() => {
    // @ts-ignore
      dispatch(initializeNotes());
  }, [dispatch]);

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  );
};

export default App;
