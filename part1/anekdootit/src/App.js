import { useState } from "react";
import Anecdote from "./Anecdote";
import MyButton from "./MyButton";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
  ];

  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  const [selected, setSelected] = useState(0);

  const indexOfMax = (arr) => arr.indexOf(Math.max(...arr));

  return (
    <div>
      <Anecdote
        title="Anecdote of the day"
        anecdote={anecdotes[selected]}
        points={points[selected]}
      />
      <MyButton
        // onClick={() => setSelected((selected + 1) % anecdotes.length)} // Actually next
        onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}
        text="next anecdote"
      />
      <MyButton
        onClick={() => {
          const temp = [...points];
          temp[selected]++;
          setPoints(temp);
        }}
        text="vote"
      />
      <Anecdote
        title="Anecdote with most votes"
        anecdote={anecdotes[indexOfMax(points)]}
        points={Math.max(...points)}
      />
    </div>
  );
};

export default App;
