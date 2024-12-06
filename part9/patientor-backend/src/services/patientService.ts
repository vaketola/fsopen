import patientData from '../../data/patients';
import { Patient, PatientNonsensitive } from '../types';

const patients: Array<Patient> = patientData as Array<Patient>;

const getPatients = (): Array<Patient> => {
  return patients;
};

const getPatientsNonsensitive = (): Array<PatientNonsensitive> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation,
  }));
};

const addPatient = () => {
  return null;
};

export default { getPatients, getPatientsNonsensitive, addPatient };
