"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewPersonSchema = exports.Gender = void 0;
const zod_1 = require("zod");
;
var Gender;
(function (Gender) {
    Gender["Male"] = "male";
    Gender["Female"] = "female";
    Gender["Other"] = "other";
})(Gender || (exports.Gender = Gender = {}));
;
exports.NewPersonSchema = zod_1.z.object({
    name: zod_1.z.string(),
    dateOfBirth: zod_1.z.string().date(),
    ssn: zod_1.z.string(),
    gender: zod_1.z.nativeEnum(Gender),
    occupation: zod_1.z.string(),
});
;
