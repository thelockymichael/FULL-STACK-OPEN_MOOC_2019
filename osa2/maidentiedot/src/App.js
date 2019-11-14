import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);

  const [searchWord, setSearchWord] = useState("DO SOMETHING");
  const [singleCountry, setSingleCountry] = useState({});
  // const [searchCountries, setSearchCountries] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://restcountries.eu/rest/v2/all?fields=name;capital;population;languages;flag`
      )
      .then(response => {
        console.log(response.data);
        setCountries(response.data);
      });
  }, []);
  // console.log("render", countries.length, "countries");
  // console.log("countries", countries);

  // console.log(event.target.value);

  // console.log(countryList.length);

  const countryList = countries.filter(country => {
    console.log(
      country.name.toLowerCase().indexOf(searchWord.toLowerCase()) >= 0
    );
    return country.name.toLowerCase().indexOf(searchWord.toLowerCase()) >= 0;
  });

  const displayListOfCountries = () => {
    if (countryList.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else {
      if (countryList.length === 1) {
        return countryList.map(country => {
          return (
            <>
              <h1>{country.name}</h1>
              <p>capital {country.capital}</p>
              <p>population {country.population}</p>
              <h3>languages</h3>
              <ul>
                {country.languages.map(language => (
                  <li>{language.name}</li>
                ))}
              </ul>
              <img src={country.flag} width="100px" />
            </>
          );
        });
      } else {
        return countryList.map(country => {
          return (
            <>
              <p>{country.name}</p>
              <button onClick={() => setCountry(country)}> show</button>
            </>
          );
        });
      }
    }
  };

  const handleCountryInputChange = event => {
    console.log(event.target.value);
    setSearchWord(event.target.value);
  };

  const setCountry = country => {
    // setCountries([]);
    setSingleCountry(country);
  };

  const displayCountry = () => {
    return (
      <>
        <h1>{singleCountry.name}</h1>
        <p>capital {singleCountry.capital}</p>
        <p>population {singleCountry.population}</p>
        <h3>languages</h3>
        {/* <ul>
          {singleCountry.languages.map(language => (
            <li>{language.name}</li>
          ))}
        </ul> */}
        <img src={singleCountry.flag} width="100px" />
      </>
    );
  };

  return (
    <>
      find countries
      <input
        onChange={handleCountryInputChange}
        placeholder="Type in a name of a country"
      />
      {displayListOfCountries() ? displayListOfCountries() : displayCountry()}
    </>
  );
};

export default App;
{
  /* <h1>{country.name}</h1>
              <p>capital {country.capital}</p>
              <p>population {country.population}</p>
              <h3>languages</h3>
              <ul>
                {country.languages.map(language => (
                  <li>{language.name}</li>
                ))}
              </ul>
              <img src={country.flag} width="100px" />
            </> */
}
