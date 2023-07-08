const Header = ({ courseName }) => <h1>{courseName}</h1>
const Content = ({ parts }) => parts.map(part => <Part key={part.id} part={part} />)
const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Total = ({ parts }) => {
  const calcTotal = parts.reduce((previous, current) => previous + current.exercises, 0)
  return <strong>total of {calcTotal} exercises</strong> 
}

const Course = ({ course }) => {
  return (
  <div>
    <Header courseName={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
  )
}

export default Course;