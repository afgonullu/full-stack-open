import React, { useState, useEffect } from "react"
import Search from "./components/Search"
import AddNew from "./components/AddNew"
import PhoneList from "./components/PhoneList"
import InfoMessage from "./components/InfoMessage"
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
  const [alert, setAlert] = useState({})

  useEffect(() => {
    getAllPersons().then((initialNumbers) => setPersons(initialNumbers))
  }, [])

  const handleDelete = (id, name) => {
    window.confirm(`Deleting ${name}. Are You Sure?`)
    deletePerson(id).then(
      setPersons(persons.filter((person) => person.id !== id))
    )
    setAlert({ message: `You deleted ${name}`, type: "alert danger" })
    setTimeout(() => {
      setAlert({})
    }, 5000)
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
      updatePerson(newPerson).then((response) => {
        console.log(response)
        getAllPersons().then((initialNumbers) => setPersons(initialNumbers))
        setAlert({
          message: `You Updated the details of ${newPerson.name}`,
          type: "alert success",
        })
        setTimeout(() => {
          setAlert({})
        }, 5000)
      })
    } else {
      console.log("new contact creation")

      console.log(newPerson)

      createNewPerson(newPerson).then((response) => {
        console.log("here")
        console.log(response)
        setPersons(persons.concat(response))
        setNewName("")
        setNewNumber("")
        setAlert({
          message: `You created a new record for ${newPerson.name}`,
          type: "alert success",
        })
        setTimeout(() => {
          setAlert({})
        }, 5000)
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
