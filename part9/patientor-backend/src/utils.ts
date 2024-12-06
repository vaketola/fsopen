import { NewPatient, Gender } from './types';

const parseString = (input: unknown, type: string): string => {
  // if (!input) throw new Error(`Missing ${type}`);
  if (typeof input !== 'string') throw new Error(`Invalid ${type}`);

  return input;
};

const parseDate = (input: unknown): string => {
  // if (!input) throw new Error ('Missing date')
  if (typeof input !== 'string') throw new Error('Invalid date');
  if (!Date.parse(input)) throw new Error('Invalid date');

  return input;
};

const parseGender = (input: unknown): Gender => {
  // if (!input) throw new Error ('Missing gender')
  if (typeof input !== 'string') throw new Error('Invalid gender');
  if (!Object.values(Gender).includes(input.toLowerCase() as Gender)) {
    throw new Error('Invalid gender');
  };
  
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

