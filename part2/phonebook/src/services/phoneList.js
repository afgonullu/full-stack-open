import axios from "axios"

const url = "/api/persons"

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

const getPerson = (id) => {
  const request = axios.get(`${url}/${id}`)
  return request.then((response) => response.data)
}

export { getAllPersons, createNewPerson, deletePerson, updatePerson, getPerson }
