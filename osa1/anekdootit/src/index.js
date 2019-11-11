import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const App = props => {
  const [selected, setSelected] = useState(props.anecdotes[0]);
  const [voteValues, setVoteValues] = useState(voteArray);
  const [mostVotes, setMostVotes] = useState(0);
  const [mostVotesAnecdoteValue, setMostVoteAnectode] = useState(0);

  const nextAnecdote = () => {
    let random = Math.floor(Math.random() * props.anecdotes.length);
    setSelected(props.anecdotes[random]);
  };

  useEffect(() => {
    mostVotesAnecdote();
  });

  const mostVotesAnecdote = () => {
    let highest = Math.max(...voteValues);
    setMostVotes(highest);
    setMostVoteAnectode(props.anecdotes[voteValues.indexOf(mostVotes)]);
    console.log("Vote values: ", voteValues);
    console.log("Highest: ", highest);
  };

  const voteAnecdote = () => {
    const copy = { ...voteValues };
    copy[props.anecdotes.indexOf(selected)] += 1;
    const newCopy = Object.values(copy);
    setVoteValues(newCopy);
  };

  return (
    <>
      <h1>Anecdote of the day</h1>
      {selected} has {voteValues[anecdotes.indexOf(selected)]} votes
      <br />
      <button onClick={() => voteAnecdote()}>vote</button>
      <button onClick={() => nextAnecdote()}>next anectode</button>
      <h1>Anecdote with most votes</h1>
      {mostVotesAnecdoteValue} has {mostVotes}
    </>
  );
};
const voteArray = Array.apply(null, new Array(6)).map(
  Number.prototype.valueOf,
  0
);

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
