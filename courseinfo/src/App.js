const Header = ({ course }) => <h2>{course}</h2>


const Total = ({ sum }) =>
  <div>
    <p>
      total of {sum} exercises
    </p>
  </div>


const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>


const Content = ({ parts }) =>
  <>
    {parts.map(part => <Part key={part.name} part={part} />)}       
  </>


const App = () => {

  const Course = ({ course }) => {

    const exercise_amount = course.parts.map(part => part.exercises)

    const initialValue = 0
    const sumWithInitial = exercise_amount.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      initialValue
    )

    console.log(sumWithInitial)

    return (
      <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <b><Total sum={sumWithInitial}/></b>
      </div>
    )

  }

  
  const Courses = ({ courses }) => {

    console.log(courses.map(course => <Course key={course.id} course={course} />))

    return (
      <div>
        <h1>Web development curriculum</h1>
        <div>
          {courses.map(course => <Course key={course.id} course={course} />)} 
        </div>
      </div>
    )
  
  }

  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Courses courses={courses} />
    </div>
  )
}

export default App
