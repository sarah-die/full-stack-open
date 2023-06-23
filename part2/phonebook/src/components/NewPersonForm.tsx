import { ChangeEventHandler, FormEventHandler } from "react";

export const NewPersonForm = (props: {
  addPerson: FormEventHandler<HTMLFormElement>;
  newName: string;
  handleNameChange: ChangeEventHandler<HTMLInputElement>;
  newNumber: string;
  handleNumberChange: ChangeEventHandler<HTMLInputElement>;
}) => (
  <form onSubmit={props.addPerson} name={"Contact"}>
    <div>
      name:{" "}
      <input
        value={props.newName}
        onChange={props.handleNameChange}
        name={"name-input"}
      />
    </div>
    <div>
      number:{" "}
      <input
        value={props.newNumber}
        onChange={props.handleNumberChange}
        name={"number-input"}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);
