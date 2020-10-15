import React from "react";

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

export default Course;
