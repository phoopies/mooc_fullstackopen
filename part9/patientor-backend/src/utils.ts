import { isString } from "lodash";
import { Gender, NewPatient, Patient } from "./types";

const toString = (str: unknown): string => {
  if (!str || !isString(str)) throw new Error("Couldn't convert to string");
  return str;
};

const parseDate = (date: unknown): string => {
  const str = toString(date);
  if (!isDate(str)) throw new Error("Date is not valid");
  return str;
};

const isDate = (date: string): boolean => Boolean(Date.parse(date));

const parseGender = (gender: unknown): Gender => {
  const str = toString(gender);
  if (!isGender(str)) throw new Error("Incorrect or missing gender");
  return str;
};

const isGender = (gender: any): gender is Gender =>
  Object.values(Gender).includes(gender);

const parseSsn = (ssn: any): string => {
  const str = toString(ssn);
  if (!isValidFinnishSsn(str)) throw new Error("Invalid ssn " + str);
  return str;
};
const isValidFinnishSsn = (ssn: string): boolean => {
  const pattern = /^\d{6}[-+A]{1}\d{3}.{1}$/;
  return pattern.test(ssn);
};

type PatientFields = {
  id: unknown;
  name: unknown;
  dateOfBirth: unknown;
  gender: unknown;
  ssn: unknown;
  occupation: unknown;
};

type NewPatientFields = Omit<PatientFields, "id">;

export const convertToNewPatient = ({
  name,
  dateOfBirth,
  gender,
  ssn,
  occupation,
}: NewPatientFields): NewPatient => {
  return {
    name: toString(name),
    dateOfBirth: parseDate(dateOfBirth),
    gender: parseGender(gender),
    ssn: parseSsn(ssn),
    occupation: toString(occupation),
  };
};

export const convertToPatient = ({
  id,
  name,
  dateOfBirth,
  gender,
  ssn,
  occupation,
}: PatientFields): Patient => {
  const temp = convertToNewPatient({
    name,
    dateOfBirth,
    gender,
    ssn,
    occupation,
  }) as Patient;
  temp.id = toString(id);
  return temp;
};
