import React, { useState, useEffect } from "react";
import noteService from "./services/persons";
import Numbers from "./components/Numbers";
import Search from "./components/Search";
import Form from "./components/Form";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [filterWord, setFilterdWord] = useState("");
  const [filteredPersons, setFilteredPersons] = useState("");

  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = () => {
    noteService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  };

  // const rows = newPersons =>
  //   newPersons.map(person => (
  //     <p key={person.id}>
  //       {person.name} {person.number}
  //     </p>
  //   ));

  const onHandleName = event => {
    setName(event.target.value);
  };

  const onHandleNumber = event => {
    setNumber(event.target.value);
  };

  const onHandleSearch = event => {
    setFilterdWord(event.target.value);
  };

  const deletePhoneNumber = (id, name) => {
    console.log(name);
    const toDelete = window.confirm(`Delete ${name} ?`);

    if (toDelete) {
      noteService.deletePerson(id).then(() => {
        setPersons(persons.filter(p => p.id !== id));
      });
    }
  };

  const updateNumber = (id, newNumber) => {
    const person = persons.find(p => p.id === id);

    //noteService.update(id, changeNumber).then(returnedNote => {});
  };

  const addPhoneNumber = event => {
    event.preventDefault();

    const numberFound = persons.find(p => p.name === name);
    console.log("Number found", numberFound);

    const phoneNumberObject = {
      name,
      number,
      id: name
    };

    noteService
      .create(phoneNumberObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setName("");
        setNumber("");
      })
      .catch(error => {
        const changedNote = { ...numberFound, number: number };

        const replace = window.confirm(
          `${name} is already added to phonebook, replace the old number with a new one?`
        );
        if (replace) {
          noteService.update(name, changedNote).then(returnedPerson => {
            setPersons(
              persons.map(person =>
                person.id !== name ? person : returnedPerson
              )
            );
          });
        }
      });
  };

  return (
    <>
      <h2>Phonebook</h2>
      <Search filterText={filterWord} filterUpdate={onHandleSearch} />
      <Form
        addPhoneNumber={addPhoneNumber}
        name={name}
        onHandleName={onHandleName}
        number={number}
        onHandleNumber={onHandleNumber}
      />
      <h2>Numbers</h2>
      <Numbers
        data={persons}
        filterText={filterWord}
        deletePhoneNumber={deletePhoneNumber}
      />
    </>
  );
};

export default App;
