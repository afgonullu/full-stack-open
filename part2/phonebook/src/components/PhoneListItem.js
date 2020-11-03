import React from "react"

const PhoneListItem = (props) => {
  return (
    <li key={props.person.name}>
      <span>
        {props.person.name} {props.person.number}
      </span>
    </li>
  )
}

export default PhoneListItem
