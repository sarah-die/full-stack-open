import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { Filter } from "./components/Filter";
import { NewPersonForm } from "./components/NewPersonForm";
import { Persons } from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

export type Contact = { name: string; number: string; id: number };
export type PostEntity<T> = Omit<T, "id">;

const App = () => {
  const [persons, setPersons] = useState<Contact[]>([]);
  // to control the form input element
  const [newName, setNewName] = useState<string>("");
  const [newNumber, setNewNumber] = useState<string>("");

  const [showAll, setShowAll] = useState<Boolean>(true);
  const [filter, setFilter] = useState<string>("");

  const [userInformation, setUserInformation] = useState<string>(
    "User Information are displayed here"
  );
  const [messageType, setMessageType] = useState<string>("success");

  // useEffect to fetch data from json server
  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const checkForDouble = () => persons.some((p) => p.name === newName);

  const updateNumber = () => {
    const person: Contact = persons.find((p) => p.name === newName)!;
    const id: number = person.id;
    const updatedPerson: Contact = { ...person, number: newNumber };
    personService
      .update(id, updatedPerson)
      .then((returnedPerson) => {
        setPersons(persons.map((p) => (p.id !== id ? p : returnedPerson)));
        setMessageType("success");
        setUserInformation(`Person ${person.name} succesful updated.`);
        setTimeout(() => {
          setUserInformation("");
        }, 5000);
      })
      .catch((error) => {
        setMessageType("error");
        setUserInformation(
          `An error happend while updating '${newName}': ${error.response.data.error}.`
        );
        setTimeout(() => {
          setUserInformation("");
        }, 5000);
      });
  };

  const addPerson: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (checkForDouble()) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        updateNumber();
      }
    } else {
      const personObject: PostEntity<Contact> = {
        name: newName,
        number: newNumber,
        // id: persons.length + 1,
      };
      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setMessageType("success");
          setUserInformation(`Person ${newName} succesful added.`);
          setTimeout(() => {
            setUserInformation("");
          }, 5000);
        })
        .catch((error) => {
          setMessageType("error");
          setUserInformation(
            `An error happend while creating '${newName}': ${error.response.data.error}.`
          );
          setTimeout(() => {
            setUserInformation("");
          }, 5000);
        });
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

  const deletePerson = (id: number) => () => {
    window.confirm(`delete ${persons.find((p: Contact) => p.id === id)!.name}`);
    personService
      .deletePerson(id)
      .then(() => {
        setMessageType("success");
        setUserInformation(
          `Person ${
            persons.find((p: Contact) => p.id === id)!.name
          } succesful deleted.`
        );
        setTimeout(() => {
          setUserInformation("");
        }, 5000);
      })
      .catch((error) => {
        setMessageType("error");
        setUserInformation(
          `The person ${
            persons.find((p: Contact) => p.id === id)!.name
          } was already deleted from server.`
        );
        setTimeout(() => {
          setUserInformation("");
        }, 5000);
        setPersons(persons.filter((p) => p.id !== id));
      });
    setPersons(persons.filter((p) => p.id !== id));
  };

  const personsToShow: Contact[] = showAll
    ? persons
    : persons.filter((person) => person.name.toLowerCase().includes(filter));

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={userInformation} messageType={messageType} />
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
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
