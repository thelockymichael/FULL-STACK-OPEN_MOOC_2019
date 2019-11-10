import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  //   const [selected, setSelected] = useState(anecdotes[0]);
  const [selected, setSelected] = useState(anecdotes[0]);

  const [arrValue, setArr] = useState(arr);

  const nextAnecdote = () => {
    let random = Math.floor(Math.random() * anecdotes.length);

    setSelected(anecdotes[random]);
  };

  const voteAnecdote = selected => {
    arr[anecdotes.indexOf(selected)] += 1;

    setArr(arr[anecdotes.indexOf(selected)]);
    // console.log("taulukko :", arr);
    // console.log("arvo: ", arr[anecdotes.indexOf(selected)]);
  };

  const anectodeWithMostVotes = () => {
    return anecdotes[selected[Math.max(arrValue)];
  };

  return (
    <>
      <h1>Anecdote of the day</h1>
      {selected} has {arr[anecdotes.indexOf(selected)]}
      <br />
      <button onClick={() => voteAnecdote(selected)}>vote</button>
      <button onClick={nextAnecdote}>next anectode</button>
      <h1>Anecdote with most votes</h1>
      {anectodeWithMostVotes()}
    </>
  );
};
const arr = Array.apply(null, new Array(6)).map(Number.prototype.valueOf, 0);
console.log(arr);

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
