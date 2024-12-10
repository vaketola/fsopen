import { z } from 'zod';

export const DiagnosisSchema = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.string().optional(),
});

export type Diagnosis = z.infer<typeof DiagnosisSchema>;

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

export const DischargeSchema = z.object({
  date: z.string(),
  criteria: z.string(),
});

export type Discharge = z.infer<typeof DischargeSchema>;

export const SickLeaveSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
});
export type SickLeave = z.infer<typeof SickLeaveSchema>;

export const BaseEntrySchema = z.object({
  id: z.string(),
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

export const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  employerName: z.string(),
  sickLeave: SickLeaveSchema.optional(),
  type: z.literal('OccupationalHealthcare'),
});

export const HospitalEntrySchema = BaseEntrySchema.extend({
  discharge: DischargeSchema,
  type: z.literal('Hospital'),
});

export const HealthCheckEntrySchema = BaseEntrySchema.extend({
  healthCheckRating: z.nativeEnum(HealthCheckRating),
  type: z.literal('HealthCheck'),
});

export type BaseEntry = z.infer<typeof BaseEntrySchema>;
export type OccupationalHealthcareEntry = z.infer<typeof OccupationalHealthcareEntrySchema>;
export type HospitalEntry = z.infer<typeof HospitalEntrySchema>;
export type HealthCheckEntry = z.infer<typeof HealthCheckEntrySchema>;

export const EntrySchema = z.union([
  // BaseEntrySchema,
  OccupationalHealthcareEntrySchema,
  HospitalEntrySchema,
  HealthCheckEntrySchema,
]);

export type Entry = z.infer<typeof EntrySchema>;

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(EntrySchema),
});

export type NewPatient = z.infer<typeof NewPatientSchema>;

export interface Patient extends NewPatient { id: string };

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type PatientNonsensitive = UnionOmit<Patient, 'ssn'>; // | 'entries'>;
