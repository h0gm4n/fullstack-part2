
const Course = ({ course }) => {

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

  export default Course

