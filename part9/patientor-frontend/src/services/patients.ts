import axios from "axios";
import { Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async (): Promise<Array<Patient>> => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getPatient = async (id: string): Promise<Patient> => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );
  
  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

export default {
  getAll, getPatient, create
};

