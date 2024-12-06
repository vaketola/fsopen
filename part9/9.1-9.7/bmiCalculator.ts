interface CalculateBmi {
  height: number;
  weight: number;
};

const parseArguments = (args: string[]): CalculateBmi => {
  if (args.length !== 4) throw new Error('Incorrect number of arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers');
  };
};

const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / (height / 100) ** 2;

  if (bmi < 16)   return 'Underweight (Severe thinness)';
  if (bmi < 17)   return 'Underweight (Moderate thinness)';
  if (bmi < 18.5) return 'Underweight (Mild thinness)';
  if (bmi < 25)   return 'Normal range';
  if (bmi < 30)   return 'Overweight (Pre-obese)';
  if (bmi < 35)   return 'Obese (Class I)';
  if (bmi < 40)   return 'Obese (Class II)';
  if (bmi >= 40)  return 'Obese (Class III)';
  return ''
};

if (require.main === module) {
  try {
    const { height, weight } = parseArguments(process.argv)
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) errorMessage += ' Error: ' + error.message;
    console.log(errorMessage);
  };  
}

export default calculateBmi;
