import { useState, useEffect } from "react";
import Header from "./Header";
import Weather from "./Weather";

const Country = ({ country, detailed }) => {
  const [showAll, setShowAll] = useState(detailed);

  useEffect(() => {
    setShowAll(detailed);
  }, [detailed]);

  const { capital, name, area, flags, languages } = country;
  return (
    <div>
      {showAll ? (
        <div>
          <Header level={3} text={name.common} />
          <p>
            capital{capital.length > 1 ? "s" : ""} {capital.join(", ")}
          </p>
          <p>area {area}</p>
          <div>
            <Header level={4} text="Languages" />

            <ul>
              {Object.entries(languages).map(([key, language]) => (
                <li key={key}>{language}</li>
              ))}
            </ul>
          </div>
          <img src={flags.png} alt={`Countries ${name} flag`} />
          <Weather countryName={name.common}/>
        </div>
      ) : (
        <div>
          <p>{name.common}</p>
        </div>
      )}
      <button onClick={(_e) => setShowAll(!showAll)}>
        {showAll ? "hide" : "show"}
      </button>
    </div>
  );
};

export default Country;
