import Country from "./Country";
import Header from "./Header";

const Countries = ({ countries }) => {
  const maxCountriesToShow = 10;
  const onlyOne = countries.length === 1;
  return (
    <div>
      {!onlyOne && <Header text="Countries" level={2} />}
      {countries.length > maxCountriesToShow ? (
        <p>Too many matches. Narrow your search</p>
      ) : countries.length === 0 ? (
        <p>No countries found</p>
      ) : (
        countries.map((country) => (
          <Country
            key={country.cca3}
            country={country}
            detailed={onlyOne}
          />
        ))
      )}
    </div>
  );
};

export default Countries;
