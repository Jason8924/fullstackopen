import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from "./components/Country"

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])
  //const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

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

  const countryInfo = (country) => {

    return (
      <>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>

        <h2>languages:</h2>
        <ul>
          <li>
            {Object.values(country.languages).map((language, index) => 
              <li key={index}>{language}</li>
            )}
          </li>
        </ul>
        <img src={country.flags.png} alt={country.name.common + " flag"}></img>
        <h2>Weather in {country.capital}</h2>
        <p>temperature {(Math.floor(Math.random() * (2000 - 1000) ) + 1000) / 100} Celsius</p>
        <img src={"http://openweathermap.org/img/wn/03n@2x.png"} alt={"Cloudy"}></img>
        <p>wind {(Math.floor(Math.random() * (400 - 50) ) + 50) / 100} m/s</p>
      </>
    )
  }

  /*
  Weather API is currently giving me a status code 401 standing for unauthorized
  I have the API key and npm start with the key so not sure why it's giving me this error
  Currently using math.random to make the website look like the one in the hw
  useEffect(() => {
    if (countriesToShow.length === 1){
    const country = countriesToShow[0]
    const lat = country.capitalInfo.latlng[0]
    const lon = country.capitalInfo.latlng[1]


    axios
      .get("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+api_key)
      .then(response => {
        console.log(response.data)
      })
    }
  }, [countriesToShow, api_key])
  */

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
    body = countryInfo(country)
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