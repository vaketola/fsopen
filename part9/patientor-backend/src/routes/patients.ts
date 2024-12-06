import express from 'express';
import patientService from '../services/patientService';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.status(200).send(patientService.getPatientsNonsensitive());
});

patientsRouter.post('/', (_req, res) => {
  res.send('Saving diagnoses');
});

export default patientsRouter;
