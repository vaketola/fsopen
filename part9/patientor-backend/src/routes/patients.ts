import express from 'express';
import patientService from '../services/patientService';
import { Patient, NewPatient } from '../types';
import { toNewPatient } from '../utils';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res): void => {
  res.status(200).send(patientService.getPatientsNonsensitive());
});

patientsRouter.post('/', (req, res): void => {
  try {
    const newPatient: NewPatient = toNewPatient(req.body);
    const patient: Patient = patientService.addPatient(newPatient);
    res.json(patient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) errorMessage = 'Error: ' + error.message;
    res.status(400).send(errorMessage);
  };
});

export default patientsRouter;
