import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { Filter } from "./components/Filter";
import { NewPersonForm } from "./components/NewPersonForm";
import { Persons } from "./components/Persons";
import axios from "axios";

export type Contact = { name: string; number: string };

const App = () => {
  const [persons, setPersons] = useState<Contact[]>([]);
  // to control the form input element
  const [newName, setNewName] = useState<string>("");
  const [newNumber, setNewNumber] = useState<string>("");

  const [showAll, setShowAll] = useState<Boolean>(true);
  const [filter, setFilter] = useState<string>("");

  // useEffect to fetch data from json server
  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);
  console.log("render", persons.length, "persons");

  const checkForDouble = () => persons.some((p) => p.name === newName);

  const addPerson: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (checkForDouble()) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObject: Contact = {
        name: newName,
        number: newNumber,
        // id: persons.length + 1,
      };
      axios
        .post("http://localhost:3001/persons", personObject)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setNewName("");
          setNewNumber("");
        });
    }
  };

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.target.value === "" ? setShowAll(true) : setShowAll(false);
    setFilter(event.target.value);
  };

  const personsToShow: Contact[] = showAll
    ? persons
    : persons.filter((person) => person.name.toLowerCase().includes(filter));

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>New Contact</h2>
      <NewPersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
