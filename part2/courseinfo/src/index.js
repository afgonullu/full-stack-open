import React from "react";
import ReactDOM from "react-dom";

const Course = (props) => {
  const courses = props.courses.map((course) => {
    return (
      <div key={course.id}>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    );
  });
  return <div>{courses}</div>;
};

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  const parts = props.parts.map((part) => {
    return <Part key={part.id} part={part} />;
  });
  return <div>{parts}</div>;
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Total = (props) => {
  const courseCount = props.parts
    .map((part) => part.exercises)
    .reduce((acc, i) => acc + i);

  return <strong>Number of exercises {courseCount}</strong>;
};

const App = () => {
  const courses = [
    {
      id: 1,
      name: "Half Stack application development",
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
    {
      name: "Responsive Web Design",
      id: 2,
      parts: [
        {
          name: "HTML",
          exercises: 3,
          id: 1,
        },
        {
          name: "CSS",
          exercises: 7,
          id: 2,
        },
        {
          name: "SASS",
          exercises: 7,
          id: 2,
        },
        {
          name: "CSS Frameworks",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return <Course courses={courses} />;
};

ReactDOM.render(<App />, document.getElementById("root"));
