import React, { useState, useEffect } from "react";
import noteService from "./services/persons";
import Numbers from "./components/Numbers";
import Search from "./components/Search";
import Form from "./components/Form";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [filterWord, setFilterdWord] = useState("");
  const [filteredPersons, setFilteredPersons] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    fetchPersons();
  }, []);

  const fetchPersons = () => {
    noteService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  };

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
      noteService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));
          setNotificationMessage(`${name} has been deleted`);
        })
        .catch(error => {
          setNotificationMessage(`${name} has already been deleted`);
        });
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
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

        setNotificationMessage(`${name} added`);
      })
      .catch(error => {
        //setNotificationMessage(`${name} has already been added.`);
        const changedNote = { ...numberFound, number };
        noteService
          .update(name, changedNote)
          .then(returnedPerson => {
            setPersons(
              persons.map(person =>
                person.id !== name ? person : returnedPerson
              )
            );
            setNotificationMessage(`${name}'s number has been updated`);
          })
          .catch(error => {
            setNotificationMessage(`${name}'s number has already been updated`);
          });
      });
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };
  // .catch(error => {
  //   const changedNote = { ...numberFound, number };
  //   noteService.update(name, changedNote).then(returnedPerson => {
  //     setPersons(
  //       persons.map(person =>
  //         person.id !== name ? person : returnedPerson
  //       )
  //     );
  //     setNotificationMessage(`${name}'s phone
  //     number has been changed`);

  //     setTimeout(() => {
  //       setNotificationMessage(null);
  //     }, 5000);
  //   });
  // setNotificationMessage(`Added ${name}`);

  // setTimeout(() => {
  //   setNotificationMessage(null);
  // }, 5000);

  // let replace = window.confirm(
  //   `${name} is already added to phonebook, replace
  //    the old number with a new one?`
  // );
  // if (replace) {

  // .catch(error => {
  //   setNotificationMessage(
  //     `Information of '${name} has
  //   already been removed from server`
  //   );
  // });

  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
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
