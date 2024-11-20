import { useState, useEffect } from 'react'
import countryService from './services/countries'

const Country = ({ country, handleSelected }) => {
  return (
    <div> 
      {country.name.common} 
      <button onClick={() => handleSelected(country)}>show</button>
    </div> 
  )
}

const CountryDetailed = ({ country }) => {
  const iconURL = 'https://openweathermap.org/img/wn/'
  const [temperature, setTemperature] = useState(null);
  const [description, setDescription] = useState('');
  const [iconCode,    setIconCode]    = useState('');
  const [wind,        setWind]        = useState(null);
  useEffect(() => {
    countryService.getWeather(country.capital)
                  .then(response => {
                    setTemperature(response.data.main.temp - 273.15)
                    setDescription(response.data.weather[0].description)
                    setIconCode(response.data.weather[0].icon)
                    setWind(response.data.wind.speed)
                  }).catch(error => {console.error('Error fetching weather data', error)})
  }, [])

  if (temperature === null) {
    return (
      <>
        <h2>{country.name.common}</h2>
        <div>capital {country.capital}</div>
        <div>area {country.area}</div>
        <h3>languages:</h3>
        <ul>
          {Object.values(country.languages).map(lang => (<li key={lang}>{lang}</li>))}
        </ul>
        <img src={country.flags.png} alt={`flag of ${country.name.common}`} />
      </>
    )
  }

  const temp = temperature.toFixed(2)
  return (
    <>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map(lang => (<li key={lang}>{lang}</li>))}
      </ul>
      <img src={country.flags.png} alt={`flag of ${country.name.common}`} />
      <h3>Weather in {country.capital}</h3>
      <div>temperature {temp} Celsius</div>
      <img src={`${iconURL}${iconCode}@2x.png`} alt={description} />
      <div>wind {wind} m/s</div>
    </>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])

  const [newSearch, setNewSearch] = useState('') 
  const handleNewSearch = (event) => {
    setNewSearch(event.target.value)
    setCountrySelected(null)
  }
  const [countrySelected, setCountrySelected] = useState(null)
  const handleSelected = (country) => setCountrySelected(country)

  useEffect(() => {
    countryService.getAll().then(response => {setCountries(response.data)})
  }, [])

  const searchResults = countries.filter(
    country => country.name.common.toLowerCase()
                                  .includes(newSearch.toLowerCase())
  )

  if (countrySelected) {
    return (
      <>
        <div>
          find countries <input value={newSearch} onChange={handleNewSearch} />
        </div>
        <CountryDetailed country={countrySelected} />
      </>
    )
  }

  if (searchResults.length == 1) {
    return (
      <> 
        <div>
          find countries <input value={newSearch} onChange={handleNewSearch} />
        </div>
        <CountryDetailed country={searchResults[0]} />
      </>
    )
  } else if (searchResults.length <= 10) {
    return (
      <> 
        <div>
          find countries <input value={newSearch} onChange={handleNewSearch} />
        </div>
        {searchResults.map(country => <Country key={country.cca3} country={country} handleSelected={handleSelected} />)}
      </>
    )
  } else {
    return (
      <> 
        <div>
          find countries <input value={newSearch} onChange={handleNewSearch} />
        </div>
        <div>
          Too many matches, specify another filter
        </div>
      </>
    )
  }
  
}

export default App
