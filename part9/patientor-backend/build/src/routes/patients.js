"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const types_1 = require("../types");
const patientsRouter = express_1.default.Router();
patientsRouter.get('/', (_req, res) => {
    res.status(200).send(patientService_1.default.getPatientsNonsensitive());
});
patientsRouter.get('/:id', (req, res) => {
    res.status(200).send(patientService_1.default.getPatient(req.params.id));
});
patientsRouter.post('/', (req, res) => {
    try {
        const newPatient = types_1.NewPatientSchema.parse(req.body);
        const patient = patientService_1.default.addPatient(newPatient);
        res.json(patient);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
    ;
});
patientsRouter.post('/:id/entries', (req, res) => {
    try {
        const patient = patientService_1.default.getPatient(req.params.id);
        if (!patient) {
            res.status(400).send('patient not found');
            return;
        }
        const newEntry = types_1.NewEntrySchema.parse(req.body);
        const entry = patientService_1.default.addEntry(patient, newEntry);
        res.json(entry);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
    ;
});
exports.default = patientsRouter;
