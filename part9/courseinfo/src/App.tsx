interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescribed extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescribed {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescribed {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartDescribed {
  requirements: Array<string>;
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    kind: "special"
  },
];

const Part = ({ coursePart }: { coursePart: CoursePart }): JSX.Element => {
  switch (coursePart.kind) {
    case 'basic':
      return (
        <>
          <b>{coursePart.name} {coursePart.exerciseCount}</b>
          <br></br>
          <i>{coursePart.description}</i>
        </>
      );
    case 'group':
      return (
        <>
          <b>{coursePart.name} {coursePart.exerciseCount}</b>
          <br></br>
          project exercises {coursePart.groupProjectCount}
        </>
      );
    case 'background':
      return (
        <>
          <b>{coursePart.name} {coursePart.exerciseCount}</b>
          <br></br>
          <i>{coursePart.description}</i>
          <br></br>
          submit to {coursePart.backgroundMaterial}
        </>
      );
    case 'special':
      return (
        <>
          <b>{coursePart.name} {coursePart.exerciseCount}</b>
          <br></br>
          <i>{coursePart.description}</i>
          <br></br>
          required skills: {coursePart.requirements.join(', ')}
        </>
      );
    default:
      return <></>;
  }
}

const Header = ({ text }: { text: string }): JSX.Element => {
  return <h1>{text}</h1>;
};

const Content = ({ courseParts }: { courseParts: Array<CoursePart> } ): JSX.Element => {
  return (
    <>
      {courseParts.map((coursePart: CoursePart) => (
        <p key={coursePart.name}>
          <Part coursePart={coursePart} />
        </p>
      ))}
    </>
  );
};

const Total = ({ total }: {total: number}) => {
  return <p>Number of exercises {total}</p>
};

const App = (): JSX.Element => {
  const courseName: string = "Half Stack application development";

  const totalExercises: number = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header text={courseName} />
      <Content courseParts={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default App;
