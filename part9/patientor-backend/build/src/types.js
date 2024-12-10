"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewEntrySchema = exports.NewPatientSchema = exports.EntrySchema = exports.HealthCheckEntrySchema = exports.HospitalEntrySchema = exports.OccupationalHealthcareEntrySchema = exports.BaseEntrySchema = exports.SickLeaveSchema = exports.DischargeSchema = exports.HealthCheckRating = exports.Gender = exports.DiagnosisSchema = void 0;
const zod_1 = require("zod");
exports.DiagnosisSchema = zod_1.z.object({
    code: zod_1.z.string(),
    name: zod_1.z.string(),
    latin: zod_1.z.string().optional(),
});
var Gender;
(function (Gender) {
    Gender["Male"] = "male";
    Gender["Female"] = "female";
    Gender["Other"] = "other";
})(Gender || (exports.Gender = Gender = {}));
;
var HealthCheckRating;
(function (HealthCheckRating) {
    HealthCheckRating[HealthCheckRating["Healthy"] = 0] = "Healthy";
    HealthCheckRating[HealthCheckRating["LowRisk"] = 1] = "LowRisk";
    HealthCheckRating[HealthCheckRating["HighRisk"] = 2] = "HighRisk";
    HealthCheckRating[HealthCheckRating["CriticalRisk"] = 3] = "CriticalRisk";
})(HealthCheckRating || (exports.HealthCheckRating = HealthCheckRating = {}));
;
exports.DischargeSchema = zod_1.z.object({
    date: zod_1.z.string(),
    criteria: zod_1.z.string(),
});
exports.SickLeaveSchema = zod_1.z.object({
    startDate: zod_1.z.string(),
    endDate: zod_1.z.string(),
});
exports.BaseEntrySchema = zod_1.z.object({
    id: zod_1.z.string(),
    description: zod_1.z.string(),
    date: zod_1.z.string(),
    specialist: zod_1.z.string(),
    diagnosisCodes: zod_1.z.array(zod_1.z.string()).optional(),
});
exports.OccupationalHealthcareEntrySchema = exports.BaseEntrySchema.extend({
    employerName: zod_1.z.string(),
    sickLeave: exports.SickLeaveSchema.optional(),
    type: zod_1.z.literal('OccupationalHealthcare'),
});
exports.HospitalEntrySchema = exports.BaseEntrySchema.extend({
    discharge: exports.DischargeSchema,
    type: zod_1.z.literal('Hospital'),
});
exports.HealthCheckEntrySchema = exports.BaseEntrySchema.extend({
    healthCheckRating: zod_1.z.nativeEnum(HealthCheckRating),
    type: zod_1.z.literal('HealthCheck'),
});
exports.EntrySchema = zod_1.z.union([
    exports.OccupationalHealthcareEntrySchema,
    exports.HospitalEntrySchema,
    exports.HealthCheckEntrySchema,
]);
exports.NewPatientSchema = zod_1.z.object({
    name: zod_1.z.string(),
    dateOfBirth: zod_1.z.string().date(),
    ssn: zod_1.z.string(),
    gender: zod_1.z.nativeEnum(Gender),
    occupation: zod_1.z.string(),
});
;
exports.NewEntrySchema = zod_1.z.union([
    exports.OccupationalHealthcareEntrySchema.omit({ id: true }),
    exports.HospitalEntrySchema.omit({ id: true }),
    exports.HealthCheckEntrySchema.omit({ id: true }),
]);
