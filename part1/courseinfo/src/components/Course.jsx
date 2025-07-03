const sumExercises = (parts) => parts.map(part => part.exercises).reduce((a,b) => a + b + 0);
const Header = ({ course }) => <h1>{course}</h1>;
const Part = ({ name, exercises }) => <p>{name} {exercises}</p>;
const Total = ({ parts }) => <p><b>Total of {sumExercises(parts)} exercises</b></p>;
const Content = ({ parts }) => {
  const partsRendered = parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>);
  return (
    <div>
      {partsRendered}
    </div>
  );
}
const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default Course;