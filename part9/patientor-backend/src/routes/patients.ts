import express, { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import patientService from '../services/patientService';
import { Patient, NewPatient, NewPersonSchema } from '../types';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res): void => {
  res.status(200).send(patientService.getPatientsNonsensitive());
});

patientsRouter.get('/:id', (req, res): void => {
  res.status(200).send(patientService.getPatient(req.params.id));
});

const newPersonParser = (req: Request, _res: Response, next: NextFunction) => { 
  try {
    NewPersonSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  };
};

patientsRouter.post('/', newPersonParser, 
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>): void => {
  const patient: Patient = patientService.addPatient(req.body);
  res.json(patient);
});

patientsRouter.use(errorMiddleware);

export default patientsRouter;
