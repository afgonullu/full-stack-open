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

        setAlert({
          message: `You created a new record for ${newPerson.name}`,
          type: "alert success",
        })
        setTimeout(() => {
          setAlert({})
        }, 5000)
      } else {
        newPerson = { ...newPerson, id: person[0].id }
        window.confirm(
          `You are updating details of ${newPerson.name}. Are You Sure?`
        )
        updatePerson(newPerson).then((response) => {
          getAllPersons()
            .then((initialNumbers) => setPersons(initialNumbers))
            .catch((error) => {
              setAlert({
                message: `${newPerson.name} doesn't exist on the database.`,
                type: "alert danger",
              })
              setTimeout(() => {
                setAlert({})
              }, 5000)
            })
        })
        setAlert({
          message: `You Updated the details of ${newPerson.name}`,
          type: "alert success",
        })
        setTimeout(() => {
          setAlert({})
        }, 5000)
      }
    })
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
