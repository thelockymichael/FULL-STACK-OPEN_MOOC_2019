import React from "react";
import { validate } from "@babel/types";

const Course = props => {
  const { course } = props;

  const { parts } = course;

  console.log(parts);
  const total = parts.reduce((s, p) => {
    return s + p.exercises;
  }, 0);

  console.log(total); // logs 6
  const rows = () =>
    course.parts.map(el => (
      <p key={el.id}>
        {el.name} {el.exercises}
      </p>
    ));

  return (
    <div>
      <h1>{course.name}</h1>
      {rows()}
      <b>total of {total} exercises</b>
    </div>
  );
};

export default Course;
