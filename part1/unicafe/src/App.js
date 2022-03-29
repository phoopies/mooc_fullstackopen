import { useState } from "react";
import Header from "./Header";
import Statistics from "./Statistics";
import StatisticsButtons from "./StatisticsButtons";

const App = () => {
  const [statistics, setStatistics] = useState({
    good: {
      points: 0,
      value: 1,
    },
    neutral: {
      points: 0,
      value: 0,
    },
    bad: {
      points: 0,
      value: -1,
    },
  });

  return (
    <div>
      <Header title={"give feedback"} />
      <StatisticsButtons statistics={statistics} setStatistics={setStatistics} />
      <Statistics statistics={statistics} />
    </div>
  );
};

export default App;
