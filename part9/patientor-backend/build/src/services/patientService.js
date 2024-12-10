"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const patients = patients_1.default;
const getPatients = () => {
    return patients;
};
const getPatient = (id) => {
    const patient = patients.find((patient) => patient.id === id);
    if (patient && !patient.entries)
        patient.entries = [];
    return patient;
};
const getPatientsNonsensitive = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id, name, dateOfBirth, gender, occupation, entries
    }));
};
const addPatient = (newPatient) => {
    const patient = Object.assign(Object.assign({ id: (0, uuid_1.v1)() }, newPatient), { entries: [] });
    patients.push(patient);
    return patient;
};
const addEntry = (patient, newEntry) => {
    const entry = Object.assign({ id: (0, uuid_1.v1)() }, newEntry);
    patient.entries.push(entry);
    return entry;
};
exports.default = { getPatients, getPatientsNonsensitive, addPatient, getPatient, addEntry };
