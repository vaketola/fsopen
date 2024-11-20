const Header = (props) => {
  return (
    <>
      <h2>
        {props.course.name}
      </h2>
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

const Content = ({ course }) => {

  return (
    <>
      {course.parts.map((part, id) => <Part key={id} part={part} />)}
    </>
  )
}

const Total = ({ course }) => {
  return (
    <b>
      total of {course.parts.reduce((total, part) => total + part.exercises, 0)} exercises
    </b>
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
    <> 
      <h1>
        Web development curriculum
      </h1>
      {courses.map((name, id) => <Course key={id} course={name} />)}
    </>
  )
}
  // return (
  //   <div>
  //     <Header  course={course} />
  //     <Content course={course} />
  //     <Total   course={course} />
  //   </div>
  // )

export default App
