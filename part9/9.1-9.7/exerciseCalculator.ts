interface CalculateExercises {
  target: number;
  hours: Array<number>;
};

const parseArguments = (args: string[]): CalculateExercises => {
  if (args.length < 4) throw new Error('Incorrect number of arguments');

  if (!isNaN(Number(args[2])) && args.slice(3).every(arg => !isNaN(Number(arg)))) {
    return {
      target: Number(args[2]),
      hours: args.slice(3).map(Number),
    };
  } else {
    throw new Error('Provided values were not numbers');
  };
};

interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
};

const calculateExercises = ( hours: Array<number>, target: number ): ExerciseResult => {
  const average: number = hours.reduce((a,b) => a+ b) / hours.length;

  return {
    periodLength: hours.length,
    trainingDays: hours.filter((hour) => hour > 0).length,
    success: average >= target,
    rating: average >= target ? 3 : average < target / 2 ? 1 : 2,
    ratingDescription: average >= target ? 'excellent' : average < target / 2 ? 'poor' : 'decent',
    target: target,
    average: average,
  };
};

try {
  const { target, hours } = parseArguments(process.argv)
  console.log(calculateExercises(hours, target));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) errorMessage += ' Error: ' + error.message;
  console.log(errorMessage);
};

export default calculateExercises;
