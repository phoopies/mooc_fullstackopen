const Total = ({ parts }) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {Object.values(parts).reduce((sum, part) => sum + part.exercises, 0)}
      </p>
    </div>
  );
};

export default Total;
