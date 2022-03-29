import Header from "./Header";

const Anecdote = ({ title, anecdote, points }) => {
  return (
    <div>
      <Header title={title} />
      <p style={{minHeight: 45}}>{anecdote}</p>
      <p style={{marginLeft: 5, color:"slateblue"}}>Has {points} votes</p>
    </div>
  );
};

export default Anecdote;
