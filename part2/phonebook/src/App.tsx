import { ChangeEventHandler, FormEventHandler, useState } from "react";

type Contact = { name: string; number: string; id: number };
type FormEvent = FormEventHandler<HTMLFormElement>;

const App = () => {
  const [persons, setPersons] = useState<Contact[]>([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  // to control the form input element
  const [newName, setNewName] = useState<string>("");
  const [newNumber, setNewNumber] = useState<string>("");

  const [showAll, setShowAll] = useState<Boolean>(true);
  const [filter, setFilter] = useState<string>("");

  const personsToShow: Contact[] = showAll
    ? persons
    : persons.filter((person) => person.name.toLowerCase().includes(filter));

  const checkForDouble = () => persons.some((p) => p.name === newName);

  const addPerson: FormEvent = (event) => {
    event.preventDefault();
    if (checkForDouble()) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObject: Contact = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      setPersons(persons.concat(personObject));
    }
    setNewName("");
    setNewNumber("");
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

  return (
    <div>
      <h1>Phonebook</h1>
      <form>
        <div>
          Filter contacts by
          <input
            value={filter}
            onChange={handleFilterChange}
            name={"filter-input"}
          />
        </div>
      </form>
      <h2>New Contact</h2>
      <form onSubmit={addPerson} name={"Contact"}>
        <div>
          name:{" "}
          <input
            value={newName}
            onChange={handleNameChange}
            name={"name-input"}
          />
        </div>
        <div>
          number:{" "}
          <input
            value={newNumber}
            onChange={handleNumberChange}
            name={"number-input"}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map((person) => {
        return (
          <div key={person.name}>
            {person.name} Nr.: {person.number}
          </div>
        );
      })}
    </div>
  );
};

export default App;
