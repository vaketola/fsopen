import { useParams } from "react-router-dom";
import {
  Entry, Patient, Diagnosis, HealthCheckRating,
  OccupationalHealthcareEntry, HospitalEntry, HealthCheckEntry,
} from "../types";
import patientService from "../services/patients";
import {
  Male, Female,
  Favorite, Work, MedicalServices,
} from '@mui/icons-material';
import { useEffect, useState } from "react";
import { Box } from "@mui/material";

const findDiagnosis = (code: string, diagnoses: Array<Diagnosis>): string => {
  const diagnosis: Diagnosis | undefined = diagnoses.find(diagnosis => diagnosis.code === code);
  if (diagnosis) return diagnosis.name;
  return '';
};

const PatientOccupationalHealthcareEntry = ({ entry, diagnoses }: {
    entry: OccupationalHealthcareEntry,
    diagnoses: Array<Diagnosis>
  }): JSX.Element => {
  
  if (entry.sickLeave) {
    return (
      <Box border={1} m={1}>
        <Work fontSize='small' /> {entry.date} <b>{entry.employerName}</b>
        <div><i>{entry.description}</i></div>
        <ul>
          {entry.diagnosisCodes?.map(code => 
            <li key={code}>
              {code} {findDiagnosis(code, diagnoses)}
            </li>
          )}
        </ul>
        <div>
          sick leave {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
        </div>
        <div>seen by {entry.specialist}</div>
      </Box>
    );
  } else {
    return (
      <Box border={1} m={1}>
        <Work fontSize='small' /> {entry.date} <b>{entry.employerName}</b>
        <div><i>{entry.description}</i></div>
        <ul>
          {entry.diagnosisCodes?.map(code => 
            <li key={code}>
              {code} {findDiagnosis(code, diagnoses)}
            </li>
          )}
        </ul>
        <div>seen by {entry.specialist}</div>
      </Box>
    );
  }
};

const PatientHospitalEntry = ({ entry, diagnoses }: {
    entry: HospitalEntry,
    diagnoses: Array<Diagnosis>
  }): JSX.Element => {

  return (
    <Box border={1} m={1}>
      <MedicalServices fontSize='small' /> {entry.date}
      <div><i>{entry.description}</i></div>
      <ul>
        {entry.diagnosisCodes?.map(code => 
          <li key={code}>
            {code} {findDiagnosis(code, diagnoses)}
          </li>
        )}
      </ul>
      <div>discharge when {entry.discharge.criteria.toLowerCase()} {entry.discharge.date}</div>
      <div>seen by {entry.specialist}</div>
    </Box>
  );
};

const PatientHealthCheckEntry = ({ entry, diagnoses }: {
    entry: HealthCheckEntry,
    diagnoses: Array<Diagnosis>
  }): JSX.Element => {

  let heartColor = 'black';
  switch (entry.healthCheckRating) {
    case HealthCheckRating.Healthy:
      heartColor = 'green';
      break;
    case HealthCheckRating.LowRisk:
      heartColor = 'yellow';
      break;
    case HealthCheckRating.HighRisk:
      heartColor = 'orange';
      break;
    case HealthCheckRating.CriticalRisk:
      heartColor = 'red';
      break;
    default: 
      heartColor = 'black';
      break;
  }
  
  return (
    <Box border={1} m={1}>
      <MedicalServices fontSize='small' /> {entry.date}
      <div>
        <Favorite sx={{ color: heartColor }} fontSize='small' />
        <i>{entry.description}</i>
      </div>
      <ul>
        {entry.diagnosisCodes?.map(code => 
          <li key={code}>
            {code} {findDiagnosis(code, diagnoses)}
          </li>
        )}
      </ul>
      <div>seen by {entry.specialist}</div>
    </Box>
  );
};

const PatientEntry = ({ entry, diagnoses }: {
  entry: Entry,
  diagnoses: Array<Diagnosis>
 }): JSX.Element => {

  switch (entry.type) {
    case "OccupationalHealthcare":
      return <PatientOccupationalHealthcareEntry entry={entry} diagnoses={diagnoses} />;
    case "Hospital":
      return <PatientHospitalEntry entry={entry} diagnoses={diagnoses} />;
    case "HealthCheck":
      return <PatientHealthCheckEntry entry={entry} diagnoses={diagnoses} />;
    default: return <></>;
  }
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

  const Other = (): JSX.Element => <></>;

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
