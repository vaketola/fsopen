import express from 'express';
import patientService from '../services/patientService';
import { Patient } from '../types';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res): void => {
  res.status(200).send(patientService.getPatientsNonsensitive());
});

patientsRouter.get('/:id', (req, res): void => {
  res.status(200).send(patientService.getPatient(req.params.id));
});

patientsRouter.post('/', (req, res): void => {
  try {
    const patient: Patient = patientService.addPatient(req.body);
    res.json(patient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if(error instanceof Error){
        errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  };
});

export default patientsRouter;
