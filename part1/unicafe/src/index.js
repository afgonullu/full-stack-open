import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
    const {handleClick, text} = props;

    return (
        <button onClick={handleClick}>{text}</button>
    );
}

const Statistic = (props) => {
    const {name, count} = props;

    return (
        <p>{name} : {count}</p>
    );
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
        <h1>give feedback</h1>
      <Button handleClick={() => setGood(good+1)} text="good" />
      <Button handleClick={() => setNeutral(neutral+1)} text="good" />
      <Button handleClick={() => setBad(bad+1)} text="good" />
      <h2>statistics</h2>
      <Statistic name="good" count={good} />
      <Statistic name="neutral" count={neutral} />
      <Statistic name="bad" count={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)