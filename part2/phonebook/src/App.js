import React, { useState, useEffect } from "react"
import Search from "./components/Search"
import AddNew from "./components/AddNew"
import PhoneList from "./components/PhoneList"
import {
  getAllPersons,
  createNewPerson,
  deletePerson,
  getPerson,
  updatePerson,
} from "./services/phoneList"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [search, setSearch] = useState("")

  useEffect(() => {
    getAllPersons().then((initialNumbers) => setPersons(initialNumbers))
  }, [])

  const handleDelete = (id, name) => {
    window.confirm(`Deleting ${name}. Are You Sure?`)
    deletePerson(id).then(
      setPersons(persons.filter((person) => person.id !== id))
    )
  }

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

    getPerson(newName).then((person) => {
      let newPerson = {
        name: newName,
        number: newNumber,
      }

      if (person.length === 0) {
        createNewPerson(newPerson).then((response) => {
          setPersons(persons.concat(response))
          setNewName("")
          setNewNumber("")
        })
      } else {
        newPerson = { ...newPerson, id: person[0].id }
        window.confirm(
          `You are updating details of ${newPerson.name}. Are You Sure?`
        )
        updatePerson(newPerson).then((response) => {
          getAllPersons().then((initialNumbers) => setPersons(initialNumbers))
        })
      }
    })
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
      <PhoneList
        persons={persons}
        search={search}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App
