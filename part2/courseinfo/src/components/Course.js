const Header = ({course}) => {
    return (
      <>
        <h2>
          {course}
        </h2>
      </>
    )
  }

const Part = ({name, exercises}) => {
  return (
    <>
      <p>
        {name} {exercises} 
      </p>
    </>
  )
}

const Content = ({parts}) => {
  return (
    <>
      {parts.map(part =>
        <Part key={part.id} part={part} />
      )}
    </>
  )
}

const Total = ({parts}) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0)

  return (
    <>
      <p><b>total of {totalExercises} exercises</b></p>
    </>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course