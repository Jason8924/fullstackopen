import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from "./components/Country"
import CountryInfo from "./components/CountryInfo"

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])

  // Get the initial data on all the countries
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  // Every time the filter or initial country data gets changed
  // Filter the countries data depending on the filter
  useEffect(() => {
    const filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    )
    setCountriesToShow(filteredCountries)
  }, [filter, countries])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const getCountryInfo = (country) => {
    setCountriesToShow([country])
  }

  let body;
  if (countriesToShow.length > 10) {
    body = <p>Too many matches, please specify another filter</p>
  }
  else if (countriesToShow.length === 0) {
    body = <p></p>
  }
  else if (countriesToShow.length > 1) {
    body = (
      <>
        {countriesToShow.map(country => 
          <Country key={country.name.common} country={country} getCountryInfo={getCountryInfo}/>
        )}
      </>
    )
  }
  else {
    const country = countriesToShow[0]
    body = <CountryInfo key={country.name.common} country={country}/>
  }

  return (
    <div>
      find countries {' '}
      <input
        value={filter}
        onChange={handleFilterChange}
      />
      {body}
    </div>
  )
}

export default App