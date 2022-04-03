import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";

const Weather = ({ countryName }) => {
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&units=metric&appid=${apiKey}`;
  const getIconUrl = ( iconId ) => `http://openweathermap.org/img/wn/${iconId}@2x.png`;

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        if (response.status === 200) {
          setWeather(response.data);
        } else {
          console.log(response);
          setError(true);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <div>
      <Header level={4} text={`Weather in ${countryName}`} />
      {loading ? <p>Fetching weather data...</p> : 
      error ? <p>Failed to fetch weather data</p> : <div>
        <p>Temperature {weather.main.temp} Celcius</p>
        <img src={getIconUrl(weather.weather[0].icon)} alt="Weather icon" />
        <p>Wind {weather.wind.speed} m\s</p>
        </div>}
    </div>
  );
};

export default Weather;
