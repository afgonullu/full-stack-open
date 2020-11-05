import React from "react"

const PhoneListItem = (props) => {
  return (
    <li key={props.person.name}>
      <span>
        {props.person.name} {props.person.number}
      </span>
      <span>
        <button
          onClick={() => props.handleDelete(props.person.id, props.person.name)}
        >
          Delete
        </button>
      </span>
    </li>
  )
}

export default PhoneListItem
