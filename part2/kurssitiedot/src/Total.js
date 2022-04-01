const Total = ({ parts }) => {
  return (
    <div>
      <b>
        Number of exercises{" "}
        {Object.values(parts).reduce((sum, part) => sum + part.exercises, 0)}
      </b>
    </div>
  );
};

export default Total;
