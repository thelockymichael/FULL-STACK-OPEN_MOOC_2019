import React from "react";

const PersonForm = props => {
  return (
    <>
      <form onSubmit={props.addPhoneNumber}>
        <h2>add a new</h2>
        <div>
          name:
          <input
            value={props.newName}
            onChange={props.handlePhonebookNameChange}
          />
        </div>
        <div>
          num:
          <input
            value={props.newNumber}
            onChange={props.handlePhonebookNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
