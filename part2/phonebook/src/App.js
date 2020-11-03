import React, { useState } from "react"
import Search from "./components/Search"
import AddNew from "./components/AddNew"
import PhoneList from "./components/PhoneList"

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [search, setSearch] = useState("")

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const current = persons.map((person) => person.name)

    if (current.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      }

      setPersons(persons.concat(newPerson))
      setNewName("")
      setNewNumber("")
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Search</h2>
      <Search search={search} handleSearch={handleSearch} />
      <h2>Add New Record</h2>
      <AddNew
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <PhoneList persons={persons} search={search} />
    </div>
  )
}

export default App
