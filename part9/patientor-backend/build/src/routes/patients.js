"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const patientService_1 = __importDefault(require("../services/patientService"));
const types_1 = require("../types");
const patientsRouter = express_1.default.Router();
patientsRouter.get('/', (_req, res) => {
    res.status(200).send(patientService_1.default.getPatientsNonsensitive());
});
const newPersonParser = (req, _res, next) => {
    try {
        types_1.NewPersonSchema.parse(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
const errorMiddleware = (error, _req, res, next) => {
    if (error instanceof zod_1.z.ZodError) {
        res.status(400).send({ error: error.issues });
    }
    else {
        next(error);
    }
    ;
};
patientsRouter.post('/', newPersonParser, (req, res) => {
    const patient = patientService_1.default.addPatient(req.body);
    res.json(patient);
});
patientsRouter.use(errorMiddleware);
exports.default = patientsRouter;
