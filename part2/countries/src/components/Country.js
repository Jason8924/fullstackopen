const Country = ({ country, getCountryInfo }) => {
    return (
      <div>
        {country.name.common}{' '}
        <button onClick={() => getCountryInfo(country)}>show</button>
      </div>
    )
  }
  
export default Country