import React, { useState, useEffect } from "react"
import axios from "axios"

const App = (props) => {
  const [search, setSearch] = useState("")
  const [countries, setCountries] = useState([])
  const [result, setResult] = useState([])
  const [output, setOutput] = useState([])

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
      setOutput(["too many matches, specify another filter"])
    } else if (result.length === 1) {
      setOutput(
        result.map((country) => {
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
            </div>
          )
        })
      )
    } else {
      setOutput(
        result.map((country) => <li key={country.name}>{country.name}</li>)
      )
    }
  }, [result])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <React.Fragment>
      <h2>Countries</h2>
      <span>
        name: <input value={search} onChange={handleSearch} />
      </span>
      <h2>Result</h2>
      <div>
        <ul>{output}</ul>
      </div>
    </React.Fragment>
  )
}

export default App
