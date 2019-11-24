import React from "react";

const Form = props => {
  const { addPhoneNumber, name, onHandleName, number, onHandleNumber } = props;

  return (
    <>
      <h2>Add a new contact</h2>
      <form onSubmit={addPhoneNumber}>
        name <input value={name} onChange={onHandleName} />
        <br />
        number
        <input value={number} onChange={onHandleNumber} />
        <br />
        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default Form;
