import { NewPatient, Gender } from './types';

const isString = (input: unknown): input is string => {
  return typeof input === 'string' || input instanceof String; 
};

const parseString = (input: unknown, type: string): string => {
  // if (!input) throw new Error(`Missing ${type}`);
  if (!isString(input)) throw new Error(`Invalid ${type}`);
  return input;
};

const parseDate = (input: unknown): string => {
  // if (!input) throw new Error ('Missing date')
  if (!isString(input) || !Date.parse(input)) throw new Error('Invalid date');
  return input;
};

const isGender = (input: string): input is Gender => {
  return Object.values(Gender).includes(input.toLowerCase() as Gender);
};

const parseGender = (input: unknown): Gender => {
  // if (!input) throw new Error ('Missing gender')
  if (!isString(input) || !isGender(input)) throw new Error('Invalid gender');
  return input.toLowerCase() as Gender;
};

export const toNewPatient = ( body: unknown ): NewPatient => {
  if (!body) throw new Error('Missing data');
  if (typeof body !== 'object') throw new Error ('Invalid data');

  if ('name' in body && 'dateOfBirth' in body && 'ssn' in body && 'gender' in body && 'occupation' in body) {
    const newPatient: NewPatient = {
      name: parseString(body.name, 'name'),
      dateOfBirth: parseDate(body.dateOfBirth),
      ssn: parseString(body.name, 'ssn'),
      gender: parseGender(body.gender),
      occupation: parseString(body.occupation, 'occupation'),
    };

    return newPatient;
  };

  throw new Error('Incorrect data: some fields are missing');
};

