import { ChangeEventHandler, FormEventHandler, useState } from "react";

type Contact = { name: string; number: string; id: number };
type FormEvent = FormEventHandler<HTMLFormElement>;

const App = () => {
  const [persons, setPersons] = useState<Contact[]>([
    { name: "Arto Hellas", number: "012-3456-789", id: 1 },
  ]);
  // to control the form input element
  const [newName, setNewName] = useState<string>("");
  const [newNumber, setNewNumber] = useState<string>("");

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson} name={"Contact"}>
        <div>
          name:{" "}
          <input
            value={newName}
            onChange={handleNameChange}
            name={"Name-Input"}
          />
        </div>
        <div>
          number:{" "}
          <input
            value={newNumber}
            onChange={handleNumberChange}
            name={"Number-Input"}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => {
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
