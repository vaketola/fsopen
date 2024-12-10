import express from 'express';
import patientService from '../services/patientService';
import {
  NewPatient, Patient, NewPatientSchema,
  NewEntrySchema, NewEntry,
  Entry,
} from '../types';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res): void => {
  res.status(200).send(patientService.getPatientsNonsensitive());
});

patientsRouter.get('/:id', (req, res): void => {
  res.status(200).send(patientService.getPatient(req.params.id));
});

patientsRouter.post('/', (req, res): void => {
  try {
    const newPatient: NewPatient = NewPatientSchema.parse(req.body);
    const patient: Patient = patientService.addPatient(newPatient);
    res.json(patient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if(error instanceof Error){
        errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  };
});

patientsRouter.post('/:id/entries', (req, res): void => {
  try {
    const patient: Patient | undefined = patientService.getPatient(req.params.id);
    if (!patient) {
      res.status(400).send('patient not found');
      return;
    }
    
    const newEntry: NewEntry = NewEntrySchema.parse(req.body);
    const entry: Entry = patientService.addEntry(patient, newEntry);

    res.json(entry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if(error instanceof Error){
        errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  };
});

export default patientsRouter;
