import {Header} from "./Header";
import {Content} from "./Content";

export const Course = ({ course }) => (
  <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    {/*<Total*/}
    {/*  sum={course.parts[0].exercises + parts[1].exercises + parts[2].exercises}*/}
    {/*/>*/}
  </div>
);
