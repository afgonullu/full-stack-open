import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = (props) => {
  const { anecdotes } = props;

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  const getMostVotedAnecdote = () => {
    let index = points.indexOf(Math.max(...points));
    console.log(index);
    return anecdotes[index];
  };

  const handleVote = () => {
    const nextPoints = [...points];
    nextPoints[selected] += 1;
    setPoints(nextPoints);
  };

  const handleChange = () => {
    let next = selected;
    while (next === selected) {
      next = Math.floor(Math.random() * anecdotes.length);
    }
    setSelected(next);
    console.log(next);
  };

  return (
    <div>
      <h2>anecdate of the day</h2>
      <p>{props.anecdotes[selected]}</p>
      <p>has {points[selected]} points.</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleChange}>next anectode</button>
      <h2>most voted anecdote</h2>
      <p>{getMostVotedAnecdote()}</p>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  "AFG; I can make a quote",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
