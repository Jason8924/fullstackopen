const CountryInfo = ({country}) => {

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

export default CountryInfo

/*
  Weather API is currently giving me a status code 401 standing for unauthorized
  I have the API key and npm start with the key so not sure why it's giving me this error
  Currently using math.random to make the website look like the one in the hw
  But would probably use an Effect hook in CountryInfo to get all the info on the country
  and then find the properties that shows the temperature, img of weather, and wind speed
*/