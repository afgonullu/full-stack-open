import React from "react"
import PhoneListItem from "./PhoneListItem"

const PhoneList = (props) => {
  return (
    <ul>
      {props.persons.map((person) => {
        if (person.name.toUpperCase().includes(props.search.toUpperCase())) {
          return <PhoneListItem person={person} />
        }
        return null
      })}
    </ul>
  )
}

export default PhoneList
