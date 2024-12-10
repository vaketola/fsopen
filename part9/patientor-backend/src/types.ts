export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
};

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
};

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
};

export interface Discharge {
  date: string;
  criteria: string;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave: SickLeave;
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital' | 'HealthCheck';
  discharge: Discharge;
  healthCheckRating?: HealthCheckRating;
}

export interface NewPatient {
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Array<BaseEntry | OccupationalHealthcareEntry | HospitalEntry>;
}

export interface Patient extends NewPatient { id: string };

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type PatientNonsensitive = UnionOmit<Patient, 'ssn'>;
