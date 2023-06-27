import { Contact } from "../App";
import { SinglePerson } from "./SinglePerson";
import { MouseEventHandler } from "react";

export const Persons = (props: {
  personsToShow: Contact[];
  deletePerson: (id: number) => MouseEventHandler<HTMLButtonElement>;
}) => (
  <div>
    {props.personsToShow.map((person) => {
      return (
        <div key={person.id}>
          <SinglePerson name={person.name} number={person.number} />
          <button onClick={props.deletePerson(person.id)}>delete</button>
        </div>
      );
    })}
  </div>
);
