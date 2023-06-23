import { ChangeEventHandler } from "react";

export const Filter = (props: {
  filter: string;
  handleFilterChange: ChangeEventHandler<HTMLInputElement>;
}) => (
  <form>
    <div>
      Filter contacts by
      <input
        value={props.filter}
        onChange={props.handleFilterChange}
        name={"filter-input"}
      />
    </div>
  </form>
);
