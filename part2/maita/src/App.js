import { useEffect, useState } from "react";
import axios from "axios";
import Countries from "./Countries";
import TextInput from "./TextInput";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState("");

  const filterCountries = () => {
    const re = new RegExp(`.*(${filter}).*`, ["i"]);
    return countries.filter((countries) =>
      re.test(countries.name.common)
    );
  };

  const shownCountries = filterCountries();

  const urlAll = "https://restcountries.com/v3.1/all";

  useEffect(() => {
    axios
      .get(urlAll)
      .then((response) => {
        if (response.status === 200) {
          setCountries(response.data);
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <p> loading </p>
      ) : (
        <div>
          {error ? (
            <p>Failed to load data</p>
          ) : (
            <div>
              <TextInput
                text="Country name"
                value={filter}
                onChange={(value) => {
                  setFilter(value);
                }}
              />
              <Countries countries={shownCountries} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default App;
