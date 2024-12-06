import express from 'express';
import calculateBmi from './bmiCalculator';
import { calculateExercises, ExerciseResult } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res): void => {
  res.send('Hello Full Stack!').status(200);
});

app.get('/bmi', (req, res): void => {
  const height: number = Number(req.query.height);
  const weight: number = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).send({ error: 'malformatted parameters' });
    return;
  };

  const bmi: string = calculateBmi(height, weight);

  res.status(200).send({ weight, height, bmi });
});

interface ExerciseRequestBody {
  target: unknown;
  hours: unknown;
}

app.post('/exercises', (req, res): void => {
  const { target, hours } = req.body as ExerciseRequestBody;

  if (target === undefined || hours === undefined) {
    res.status(400).send({ error: 'parameters missing' });
    return;
  }

  if (typeof target !== 'number' || !Array.isArray(hours)) {
    res.status(400).send({ error: 'malformed parameters' });
    return;
  }

  const targetNumber: number = Number(target);
  const hoursArray: Array<number> = hours.map(Number);
  
  if (isNaN(targetNumber) || hoursArray.some(isNaN)) {
    res.status(400).send({ error: 'malformed parameters' });
    return;
  };

  const result: ExerciseResult = calculateExercises(hoursArray, targetNumber);

  res.status(200).send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
