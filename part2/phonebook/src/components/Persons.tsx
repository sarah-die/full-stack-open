import { Contact } from "../App";
import { SinglePerson } from "./SinglePerson";

export const Persons = (props: { personsToShow: Contact[] }) => (
  <div>
    {props.personsToShow.map((person) => {
      return (
        <SinglePerson
          name={person.name}
          number={person.number}
          key={person.name}
        />
      );
    })}
  </div>
);
