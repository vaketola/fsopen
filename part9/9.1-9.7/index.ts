import express from 'express';
import calculateBmi from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res): void => {
  res.send('Hello Full Stack!').status(200);
});

app.get('/bmi', (req, res): void => {
  const height: number = Number(req.query.height);
  const weight: number = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.send({ error: 'malformatted parameters' }).status(400);
    return;
  };

  const bmi: string = calculateBmi(height, weight);

  res.send({ weight, height, bmi }).status(200);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
