import { z } from 'zod';

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

export const EntrySchema = z.object({});
export type Entry = z.infer<typeof EntrySchema>;

export const NewPersonSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
  entries: z.array(EntrySchema),
});

export type NewPatient = z.infer<typeof NewPersonSchema>; 

export interface Patient extends NewPatient { id: string };

export type PatientNonsensitive = Omit<Patient, 'ssn' | 'entries'>;
