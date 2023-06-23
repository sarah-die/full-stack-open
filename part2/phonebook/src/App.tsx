import { useState } from "react";

type Contact = { name: string; id: number };

const App = () => {
  const [persons, setPersons] = useState<Contact[]>([
    { name: "Arto Hellas", id: 1 },
  ]);
  // to control the form input element
  const [newName, setNewName] = useState<string>("");

  const checkForDouble = () => persons.some((p) => p.name === newName);

  const addPerson = (event: any) => {
    event.preventDefault();
    if (checkForDouble()) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObject: Contact = {
        name: newName,
        id: persons.length + 1,
      };
      setPersons(persons.concat(personObject));
    }
    setNewName("");
  };

  const handleNameChange = (event: any) => {
    setNewName(event.target.value);
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
            name={"Contact-Input"}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => {
        return <div key={person.name}>{person.name}</div>;
      })}
    </div>
  );
};

export default App;
