import React, { useState } from "react";
import noteService from "../services/persons";

const Persons = props => {
  const [persons, setPersons] = useState([]);

  const deleteNote = id => {
    noteService.deletePerson(id).then(returnedNote => {
      setPersons(
        persons.map(person => (person.id !== id ? person : returnedNote))
      );
    });
  };

  const rows = () =>
    persons.map(person => (
      <p key={person.id}>
        {person.name} {person.number}
        <button onClick={() => deleteNote(person.id)}>DELETE</button>
      </p>
    ));

  const listOfNames = (filteredPeople, persons) => {
    if (filteredPeople.length === 0) {
      return persons.map(person => (
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deleteNote(person.id)}>DELETE</button>
        </p>
      ));
    } else {
      return filteredPeople.map(person => (
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deleteNote(person.id)}>DELETE</button>
        </p>
      ));
    }
  };
  return (
    <>
      {listOfNames(props.filteredPeople, props.persons)}
      {rows()}
      {/* <input value={props.value} onChange={props.onChange} />; */}
    </>
  );
};

export default Persons;
