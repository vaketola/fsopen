const Header = (props) => {
  return (
    <>
      <h1>
        {props.course.name}
      </h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </>
  )
}

const Content = (props) => {

  return (
    <>
      {props.course.parts.map((part, id)=> <Part key={id} part={part} />)}
    </>
  )
}

const Total = (props) => {
  return (
    <p>
      Number of exercises {props.course.parts.reduce((total, part) => total + part.exercises, 0)}
    </p>
  )
}

const Course = (props) => {

  return (
    <div>
      <Header  course={props.course} />
      <Content course={props.course} />
      <Total   course={props.course} />
    </div>
  )
}

const App = () => {
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

  return <Course course={course} />
}
  // return (
  //   <div>
  //     <Header  course={course} />
  //     <Content course={course} />
  //     <Total   course={course} />
  //   </div>
  // )

export default App
