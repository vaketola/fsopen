import { useParams } from "react-router-dom";
import {
  BaseEntry, OccupationalHealthcareEntry,
  HospitalEntry, Patient 
} from "../types";
import patientService from "../services/patients";
import { Male, Female } from '@mui/icons-material';
import { useEffect, useState } from "react";

const Other = (): JSX.Element => <></>;

// export interface BaseEntry {
//   id: string;
//   description: string;
//   date: string;
//   specialist: string;
//   diagnosisCodes?: Array<Diagnosis['code']>;
// }

const Entry = ({ entry }: {
  entry: BaseEntry | OccupationalHealthcareEntry | HospitalEntry
 }): JSX.Element => {
  return (
    <>
      {entry.date} <i>{entry.description}</i>
      <ul>
        {entry.diagnosisCodes?.map(code => <li key={code}>{code}</li>)}
      </ul>
    </>
  );
};

const PatientInfoPage = (): JSX.Element => {
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
        <div>{patient.entries.map(entry => <Entry key={entry.id} entry={entry} />)}</div>
      </div>
    );
  }
  return <div>Missing patient information</div>;
};

export default PatientInfoPage;
