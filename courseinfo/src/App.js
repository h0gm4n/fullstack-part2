const Header = ({ course }) => <h1>{course}</h1>


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
    <Part
      part={parts[0]} 
    />
    <Part
      part={parts[1]} 
    />
    <Part
      part={parts[2]} 
    />      
  </>


const App = () => {

  const Course = ({ course }) => {

    const exercise_amount = course.parts.map(part => part.exercises)
    console.log(exercise_amount)

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

  const course = {
    id: 1,
    name: 'Half Stack application development',
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
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App
