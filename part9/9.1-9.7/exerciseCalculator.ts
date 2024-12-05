interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

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

console.log(calculateExercises( [3, 0, 2, 4.5, 0, 3, 1], 2 ))
