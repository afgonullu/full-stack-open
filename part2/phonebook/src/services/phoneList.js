import axios from "axios"

const url = "http://localhost:3001/persons"

const getAllPersons = () => {
  const request = axios.get(url)
  return request.then((response) => response.data)
}

const createNewPerson = (newPerson) => {
  const request = axios.post(url, newPerson)
  return request.then((response) => response.data)
}

const deletePerson = (id) => {
  const request = axios.delete(`${url}/${id}`)
  return request.then((response) => response.data)
}

export { getAllPersons, createNewPerson, deletePerson }
