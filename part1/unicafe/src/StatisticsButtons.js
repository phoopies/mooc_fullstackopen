import StatisticsButton from "./StatisticsButton";

const StatisticsButtons = ({ statistics, setStatistics }) => {
    return (
        <div>
            {Object.entries(statistics).map(([key, data]) => (
                <StatisticsButton
                    key={key}
                    onClick={() =>
                        setStatistics(() => ({ ...statistics, [key]: { ...data, points: data.points + 1 } }))
                    }
                    text={key}
                />
            ))}
        </div>
    );
};

export default StatisticsButtons;
