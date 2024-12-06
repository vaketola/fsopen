import diagnosisData from '../../data/diagnoses';
import { Diagnosis } from '../types';

const diagnoses: Array<Diagnosis> = diagnosisData as Array<Diagnosis>;

const getDiagnoses = (): Array<Diagnosis> => {
  return diagnoses;
};

const addDiagnosis = () => {
  return null;
};

export default { getDiagnoses, addDiagnosis };
