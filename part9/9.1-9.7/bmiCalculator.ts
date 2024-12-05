
const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / (height / 100)**2;
  
  if (bmi < 16)   return "Underweight (Severe thinness)";
  if (bmi < 17)   return "Underweight (Moderate thinness)";
  if (bmi < 18.5) return "Underweight (Mild thinness)";
  if (bmi < 25)   return "Normal range";
  if (bmi < 30)   return "Overweight (Pre-obese)";
  if (bmi < 35)   return "Obese (Class I)";
  if (bmi < 40)   return "Obese (Class II)";
  if (bmi >= 40)  return "Obese (Class III)";
};

// const height: number = Number(process.argv[2])
// const weight: number = Number(process.argv[3])
console.log(calculateBmi(180, 74))
