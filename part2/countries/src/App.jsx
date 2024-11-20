import { useState, useEffect } from 'react'
import countryService from './services/countries'

const Country = ({ name }) => {
  return <div> {name} </div>
}

const CountryDetailed = ({ country }) => {
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

const App = () => {
  const [countries, setCountries] = useState([])

  const [newSearch, setNewSearch] = useState('') 
  const handleNewSearch = (event) => {setNewSearch(event.target.value)}

  useEffect(() => {
    countryService.getAll().then(response => {setCountries(response.data)})
  }, [])

  const searchResults = countries.filter(
    country => country.name.common.toLowerCase()
                                  .includes(newSearch.toLowerCase())
  )

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
        {searchResults.map(country => <Country key={country.cca3} name={country.name.common} />)}
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
