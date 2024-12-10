import { useParams } from "react-router-dom";
import {
  Entry, Patient, Diagnosis
} from "../types";
import patientService from "../services/patients";
import { Male, Female } from '@mui/icons-material';
import { useEffect, useState } from "react";

const Other = (): JSX.Element => <></>;

const findDiagnosis = (code: string, diagnoses: Array<Diagnosis>): string => {
  const diagnosis: Diagnosis | undefined = diagnoses.find(diagnosis => diagnosis.code === code);
  if (diagnosis) return diagnosis.name;
  return '';
};

const PatientEntry = ({ entry, diagnoses }: {
  entry: Entry,
  diagnoses: Array<Diagnosis>
 }): JSX.Element => {
  return (
    <>
      {entry.date} <i>{entry.description}</i>
      <ul>
        {entry.diagnosisCodes?.map(code => 
          <li key={code}>
            {code} {findDiagnosis(code, diagnoses)}
          </li>)
        }
      </ul>
    </>
  );
};

const PatientInfoPage = ({ diagnoses }: { diagnoses: Array<Diagnosis> }): JSX.Element => {
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  
  const id: string | undefined = useParams().id;

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const patient: Patient | undefined = await patientService.getPatient(id);
        setPatient(patient);
      }
    };

    void fetchPatient();
  }, [id]);

  if (patient) {
    const Icon = 
      (patient.gender.toString() === 'male') ? Male : 
      (patient.gender.toString() === 'female') ? Female : Other;

    return (
      <div className="App">
        <h1>{patient.name} <Icon /></h1>
        <div>ssn: {patient.ssn}</div>
        <div>occupation: {patient.occupation}</div>
        <h2>entries</h2>
        <div>{patient.entries.map(entry => <PatientEntry key={entry.id} entry={entry} diagnoses={diagnoses} />)}</div>
      </div>
    );
  }
  return <div>Missing patient information</div>;
};

export default PatientInfoPage;
