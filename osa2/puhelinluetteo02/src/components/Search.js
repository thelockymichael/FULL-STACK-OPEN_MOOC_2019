import React from "react";

const Search = props => {
  return (
    <form>
      <input
        type="text"
        value={props.filterText}
        onChange={props.filterUpdate}
        placeholder="Type to filter"
      />
    </form>
  );
};

export default Search;
