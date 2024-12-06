interface CoursePart { name: string, exerciseCount: number };

const Header = ({ text }: { text: string }): JSX.Element => {
  return <h1>{text}</h1>;
};

const Content = ({ courseParts }: { courseParts: Array<CoursePart> } ): JSX.Element => {
  return (
    <>
      {courseParts.map((coursePart: CoursePart) => (
        <p key={coursePart.name}>
          {coursePart.name} {coursePart.exerciseCount}
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
  const courseParts: Array<CoursePart> = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

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
