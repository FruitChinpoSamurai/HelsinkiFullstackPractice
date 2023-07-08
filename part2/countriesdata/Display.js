import { useState, useEffect } from "react";
import countryServices from "./services/Countries";

const Searchbar = ({ value, handleChange }) => <div>find country: <input value={value} placeholder='...' onChange={handleChange} /></div>

const Countries = ({ value, countries, show, setShow }) => {
  if (value === '' || countries === []) {
    return <></>
  } else if ((value !== '' && countries !== [])) {
    const filteredCountries = countries.filter(country => (country.name.common.toLocaleLowerCase()).includes(value.toLocaleLowerCase()));
    if (filteredCountries.length === 1) {
      return <Country countryData={filteredCountries[0]} />
    } else {
      if (filteredCountries.length > 10) {
        return <p>Too many matches. Please specify further.</p>
      } else if (filteredCountries.length < 10 && filteredCountries.length > 1) {
        return (
          <div>
            {filteredCountries.map(country => 
              <div key={country.name.common}>
                {country.name.common}     
                <button onClick={() => setShow(country)}>show</button>
              </div>
            )}
            { show !== null && <Country countryData={show} /> }
          </div>
        )
      } else if (filteredCountries.length === 0) {
        return <p>Country that includes the given spelling does not exist.</p>
      } 
    }
  }
}

const Country = ({ countryData }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    countryServices
      .getWeather(countryData.capitalInfo.latlng[0], countryData.capitalInfo.latlng[1])
      .then(weatherReturned => setWeather(weatherReturned))
  });

  return (
    <div>
      <h1>{countryData.name.common}</h1>
      <div>
        <span>capital {countryData.capital}</span><br/>
        <span>area {countryData.area}</span>
      </div>
      <br/>
      <strong>languages:</strong>
      <ul>
        {Object.values(countryData.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={Object.values(countryData.flags)[0]} alt={Object.values(countryData.flags)[2]} style={{ width: '200px', border: '1px solid black' }}/>
      <h2>Weather in {countryData.capital}</h2>
      {
        weather !== null &&
          <div>
            <span>temperature {weather.daily.temperature_2m_max[0]} Celsius</span><br/>
            <span>wind {weather.daily.windspeed_10m_max[0] / 3.6} m/s</span>
          </div>
      }
    </div>
  )
}

export { Searchbar, Countries };