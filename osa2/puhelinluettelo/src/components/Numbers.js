import React from "react";

const NumberList = props => {
  const { data, filterText, deletePhoneNumber } = props;

  const numbersList = data
    .filter(name => {
      return name.name.indexOf(filterText) >= 0;
    })
    .map(name => {
      return (
        <p key={name.id}>
          {name.name} {name.number}
          <button onClick={() => deletePhoneNumber(name.id, name.name)}>
            DELETE
          </button>
        </p>
      );
    });

  return <>{numbersList}</>;
};

export default NumberList;
