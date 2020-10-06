import React from "react";
import ReactDOM from "react-dom";

const Hello = (props) => {
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old.
      </p>
    </div>
  );
};

const App = () => {
  const name = "Peter";
  const age = 19;

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="af" age="30" />
      <Hello name="cihangera" age={35 + 5} />
      <Hello name={name} age={age} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
