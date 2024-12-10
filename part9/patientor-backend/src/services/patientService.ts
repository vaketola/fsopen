import patientData from '../../data/patients';
import { Patient, NewPatient, PatientNonsensitive, NewEntry, Entry } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Array<Patient> = patientData;

const getPatients = (): Array<Patient> => {
  return patients;
};

const getPatient = (id: string): Patient | undefined => {
  const patient: Patient | undefined = patients.find((patient: Patient) => patient.id === id);
  if (patient && !patient.entries) patient.entries = [];
  return patient;
};

const getPatientsNonsensitive = (): Array<PatientNonsensitive> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id, name, dateOfBirth, gender, occupation, entries
  }));
};

const addPatient = ( newPatient: NewPatient ): Patient => {
  const patient : Patient = { id: uuid(), ...newPatient, entries: []};
  patients.push(patient);
  return patient;
};

const addEntry = ( patient: Patient, newEntry: NewEntry ): Entry => {
  const entry : Entry = { id: uuid(), ...newEntry};
  patient.entries.push(entry);
  return entry;
};

export default { getPatients, getPatientsNonsensitive, addPatient, getPatient, addEntry };
