import { useState, useEffect } from 'react';
import getCountries from './services/countries'
import getWeather from './services/weather';

const CountryInput = ({ country, handleCountryChange }) => {
  return (
    <div>
        find countries 
        <input value={country ? country : ""} onChange={handleCountryChange}></input>
    </div>
  )
}

const Country = ({ name, handleClick }) => {
  return (
    <div>
      {name}
      <button onClick={handleClick}>show</button>
    </div>
  )
}

const Weather = ({ capital, weather }) => {
  if (weather) {
    const temp = weather.temp_c;
    const iconUrl = weather.condition.icon;
    const wind = weather.wind_kph;
    return (
      <div>
        <h2>Weather in {capital}</h2>
        <p>Temperature: {temp} Celsius</p>
        <img src={iconUrl}></img>
        <p>Wind: {wind} kph</p>
      </div>
    )
  } else {
    return (
      <div>Loading Weather BLYATTTT</div>
    )
  }
}

const CountryInfo = ({ countryObj }) => {
  const languages = Object.values(countryObj.languages);
  const flagUrl = countryObj.flags.png;
  const capital = countryObj.capital[0];
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (capital) {
      getWeather(capital)
        .then(weatherObj => {
          setWeather(weatherObj);
        })
    }
  }, [capital]);

  return (
    <div>
        <h1>{countryObj.name.common}</h1>
        <div>Capital: {capital}</div>
        <div>Area: {countryObj.area}</div>
        <h2>Languages</h2>
        <ul>
          {languages.map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={flagUrl}></img>
        <Weather capital={capital} weather={weather}/>
    </div>
  )
}

const Results = ({ countryList, handleViewChangeOf }) => {
  if (countryList) {
    if (countryList.length === 1) {
      const countryObj = countryList[0];
      return (
        <CountryInfo countryObj={countryObj} />
      )
    } else if (countryList.length === 0) {
      return (
         <div>
          No matches, specify another filter
        </div>
      )
    } else if (countryList.length < 10) {
      return (
         <div>
            {countryList.map(country => <Country key={country.name.common} name={country.name.common} handleClick={() => handleViewChangeOf(country.name.common)} />)}
        </div>
      )
    } else {
      return (
        <div>
          Too many matches, specify another filter
        </div>
      )
    }
  } else {
    return (
      <div></div>
    )
  }
} 

function App() {
  const [country, setCountry] = useState(null);
  const [countryList, setCountryList] = useState(null);

  useEffect(() => {
    if (country) {
      getCountries(country)
        .then(countries => {
          setCountryList(countries);
        })
    }
  }, [country]);

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  }

  const handleViewChangeOf = (name) => {
    setCountry(name);
  }

  return (
    <div>
      <CountryInput country={country} handleCountryChange={handleCountryChange}/>
      {(country === null) ? <div></div> : (country.trim() === "") ? <div></div> : <Results handleViewChangeOf={handleViewChangeOf} countryList={countryList}/>}
    </div>
  )
}

export default App;
