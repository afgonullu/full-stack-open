import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = (props) => {
  const { handleClick, text } = props;

  return <button onClick={handleClick}>{text}</button>;
};

const Statistic = (props) => {
  const { name, count } = props;

  return (
    <p>
      {name} : {count}
    </p>
  );
};

const Statistics = (props) => {
  const {
    good,
    neutral,
    bad,
    totalFeedback,
    average,
    positivePercentage,
  } = props;

  if(totalFeedback === 0) {
      return (
          <div>No feedback given</div>
      );
  }

  return (
    <div>
      <Statistic name="good" count={good} />
      <Statistic name="neutral" count={neutral} />
      <Statistic name="bad" count={bad} />
      <Statistic name="all" count={totalFeedback} />
      <Statistic name="average" count={average} />
      <Statistic name="positive" count={positivePercentage} />
    </div>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const totalFeedback = () => {
    return good + neutral + bad;
  };

  const average = () => {
    let result = (good - bad) / totalFeedback();

    if (isNaN(result)) {
      result = 0;
    }
    return result;
  };

  const positivePercentage = () => {
    let result = (100 * good) / totalFeedback();

    if (isNaN(result)) {
      result = 0;
    }

    return result + " %";
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h2>Statistics</h2>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        totalFeedback={totalFeedback()}
        average={average()}
        positivePercentage={positivePercentage()}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
