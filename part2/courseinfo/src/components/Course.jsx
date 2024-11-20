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

  export default Course
