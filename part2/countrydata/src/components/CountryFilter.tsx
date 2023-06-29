import { ChangeEventHandler } from "react";

export const CountryFilter = (props: {
  filter: string;
  handleFilterChange: ChangeEventHandler<HTMLInputElement>;
}) => (
  <form>
    <div>
      Find countries:
      <input
        value={props.filter}
        onChange={props.handleFilterChange}
        name={"country-filter"}
      />
    </div>
  </form>
);
