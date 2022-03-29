import Header from "./Header";
import StatisticLine from "./StatisticLine";

const Statistics = ({ statistics }) => {
    const all = Object.values(statistics).reduce(
        (total, { points }) => total + points,
        0
    );

    return (
        <div>
            <Header title="statistics" />
            {all > 0 ? (
                <table>
                    <tbody>
                        {Object.entries(statistics).map(([key, data]) => (
                            <StatisticLine key={key} text={key} value={data.points} />
                        ))}
                        <StatisticLine text="all" value={all} />
                        <StatisticLine text="average" value={(Object.values(statistics).reduce(
                            (total, { points, value }) => total + value * points,
                            0
                        ) / all).toFixed(2)} />
                        <StatisticLine text="positive" value={`${(100 * statistics.good.points / all).toFixed(2)} %`} />
                    </tbody>
                </table>
            ) : (
                <p>No feedback given</p>
            )}
        </div>
    );
};

export default Statistics;
