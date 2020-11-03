import React, { useState, useEffect } from "react"
import axios from "axios"

const App = (props) => {
  const [search, setSearch] = useState("")
  const [countries, setCountries] = useState([])
  const [result, setResult] = useState([])
  const [output, setOutput] = useState([])
  const [details, setDetails] = useState([])
  const [tempDetails, setTempDetails] = useState({})

  const showCountryDetails = (country) => {
    setOutput([])
    setSearch("")
    getWeatherDetails(country.capital)
    return (
      <div>
        <h1>{country.name}</h1>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <h3>Languages</h3>
        <ul>
          {country.languages.map((language) => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>
        <img
          src={country.flag}
          width="100px"
          height="auto"
          alt="country flag"
        />
        <h3>Weather in {country.capital}</h3>
        <p>temperature: {tempDetails.temp} Celcius</p>
        <img src={tempDetails.icon} alt="Temp Icon" />
        <p>Wind Speed: {tempDetails.windSpeed} mph</p>
        <p>Wind Direction: {tempDetails.windDir}</p>
      </div>
    )
  }

  async function getWeatherDetails(capital) {
    await axios
      .get(
        `http://api.weatherstack.com/current?access_key=14218e53555180130b304f878084a26d&query=${capital}`
      )
      .then((response) => {
        console.log(response.data.current)
        setTempDetails({
          temp: response.data.current.temperature,
          icon: response.data.current.weather_icons,
          windSpeed: response.data.current.wind_speed,
          windDir: response.data.current.wind_dir,
        })
      })
  }

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data)
    })
  }, [])

  useEffect(() => {
    setResult(
      countries.filter((country) =>
        country.name.toUpperCase().includes(search.toUpperCase())
      )
    )
  }, [countries, search])

  useEffect(() => {
    if (result.length > 10) {
      if (search === "") {
        setOutput([""])
      } else {
        setOutput(["too many matches, specify another filter"])
      }
    } else if (result.length === 1) {
      setDetails(
        result.map((country) => {
          return showCountryDetails(country)
        })
      )
    } else {
      setOutput(
        result.map((country) => (
          <li key={country.name}>
            {country.name}
            <button onClick={() => setDetails(showCountryDetails(country))}>
              show
            </button>
          </li>
        ))
      )
    }
  }, [result])

  const handleSearch = (event) => {
    setSearch(event.target.value)
    setDetails([])
    setOutput([])
  }

  return (
    <React.Fragment>
      <h2>Countries</h2>
      <span>
        name: <input value={search} onChange={handleSearch} />
      </span>
      <h2>Result</h2>
      <div>
        {output}
        {details}
      </div>
    </React.Fragment>
  )
}

export default App
