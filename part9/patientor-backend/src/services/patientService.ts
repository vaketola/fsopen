import patientData from '../../data/patients';
import { Patient, NewPatient, PatientNonsensitive } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Array<Patient> = patientData as Array<Patient>;

const getPatients = (): Array<Patient> => {
  return patients;
};

const getPatient = (id: string): Patient | undefined => {
  const patient: Patient | undefined = patients.find((patient: Patient) => patient.id === id);
  if (patient && !patient.entries) patient.entries = [];
  return patient;
};

const getPatientsNonsensitive = (): Array<PatientNonsensitive> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation,
  }));
};

const addPatient = ( newPatient: NewPatient ): Patient => {
  const patient : Patient = { id: uuid(), ...newPatient};
  patients.push(patient);
  return patient;
};

export default { getPatients, getPatientsNonsensitive, addPatient, getPatient };
