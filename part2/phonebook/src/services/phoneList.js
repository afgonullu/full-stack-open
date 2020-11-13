import axios from "axios"

const url = "http://localhost:3001/api/persons"

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

const updatePerson = (updatedPerson) => {
  const request = axios.put(`${url}/${updatedPerson.id}`, updatedPerson)
  return request.then((response) => response.data)
}

const getPerson = (name) => {
  const request = axios.get(`${url}?name=${name}`)
  return request.then((response) => response.data)
}

export { getAllPersons, createNewPerson, deletePerson, updatePerson, getPerson }
