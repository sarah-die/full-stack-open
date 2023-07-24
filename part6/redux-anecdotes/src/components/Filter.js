import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();
  // const filter = useSelector((state) => state.filter);

  const filterAnecdotes = (event) => {
    event.preventDefault();
    const filter = event.target.value;

    dispatch(filterChange(filter));
  };

  return (
    <form onChange={filterAnecdotes}>
      Filter anecdotes by
      <input name="filter" />
    </form>
  );
};

export default Filter;
