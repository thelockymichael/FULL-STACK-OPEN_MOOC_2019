import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";
import noteService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    noteService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [filteredPeople, setFilteredPeople] = useState("");

  const addPhoneNumber = event => {
    event.preventDefault();
    const phoneNumberObject = {
      name: newName,
      number: newNumber,
      id: newName
    };

    if (!persons.some(name => name.name === phoneNumberObject.name)) {
      noteService.create(phoneNumberObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
    } else {
      alert(`${newName} is already added to phonebook.`);
    }
  };

  const handlePhonebookNameChange = event => {
    setNewName(event.target.value);
  };

  const handlePhonebookNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleSearchWord = event => {
    setSearchWord(event.target.value);

    const namesList = persons.filter(name => {
      return name.name.toLowerCase().indexOf(searchWord.toLowerCase()) >= 0;
    });

    setFilteredPeople(namesList);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      filter names with
      <Filter value={searchWord} onChange={handleSearchWord} />
      <PersonForm
        addPhoneNumber={addPhoneNumber}
        newName={newName}
        handlePhonebookNameChange={handlePhonebookNameChange}
        newNumber={newNumber}
        handlePhonebookNumberChange={handlePhonebookNumberChange}
      />
      <h2>Numbers</h2>
      <Persons filteredPeople={filteredPeople} persons={persons} />
    </div>
  );
};

export default App;
