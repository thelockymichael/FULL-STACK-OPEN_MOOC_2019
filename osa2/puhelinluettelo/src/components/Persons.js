import React from "react";

const Persons = props => {
  const listOfNames = (filteredPeople, persons) => {
    if (filteredPeople.length === 0) {
      return persons.map(person => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ));
    } else {
      return filteredPeople.map(person => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ));
    }
  };
  return (
    <>
      {listOfNames(props.filteredPeople, props.persons)}
      <input value={props.value} onChange={props.onChange} />;
    </>
  );
};

export default Persons;
