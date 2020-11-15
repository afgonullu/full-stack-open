import React, { useState, useEffect } from "react"
import Search from "./components/Search"
import AddNew from "./components/AddNew"
import PhoneList from "./components/PhoneList"
import InfoMessage from "./components/InfoMessage"
import {
  getAllPersons,
  createNewPerson,
  deletePerson,
  updatePerson,
} from "./services/phoneList"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [search, setSearch] = useState("")
  const [alert, setAlert] = useState({})

  useEffect(() => {
    getAllPersons().then((initialNumbers) => setPersons(initialNumbers))
  }, [])

  const createNewAlert = (alert) => {
    setAlert({
      message: alert[0],
      type: alert[1],
    })
    setTimeout(() => {
      setAlert({})
    }, 5000)
  }

  const handleDelete = (id, name) => {
    window.confirm(`Deleting ${name}. Are You Sure?`)
    deletePerson(id).then(
      setPersons(persons.filter((person) => person.id !== id))
    )
    createNewAlert([`You deleted ${name}`, "alert danger"])
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

    let newPerson = {
      name: newName,
      number: newNumber,
    }

    console.log(
      "is array includes name:",
      persons.some((person) => person.name === newName)
    )

    if (persons.some((person) => person.name === newName)) {
      const person = persons.find((person) => person.name === newName)

      newPerson = { ...person, number: newNumber }
      console.log("there is an entry in the database, updating...")
      updatePerson(newPerson)
        .then((response) => {
          console.log(response)
          getAllPersons().then((initialNumbers) => setPersons(initialNumbers))
          createNewAlert([
            `You Updated the details of ${newPerson.name}`,
            "alert success",
          ])
        })
        .catch((error) => {
          console.log(error.response.data)
          createNewAlert([error.response.data.error, "alert danger"])
        })
    } else {
      console.log("new contact creation")

      console.log(newPerson)

      createNewPerson(newPerson)
        .then((response) => {
          console.log("here")
          console.log(response)
          setPersons(persons.concat(response))
          setNewName("")
          setNewNumber("")
          createNewAlert([
            `You created a new record for ${newPerson.name}`,
            "alert success",
          ])
        })
        .catch((error) => {
          console.log(error.response.data)
          createNewAlert([error.response.data.error, "alert danger"])
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <InfoMessage message={alert.message} alertType={alert.type} />
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
