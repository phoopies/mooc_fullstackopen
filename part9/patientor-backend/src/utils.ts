import { isNumber, isString } from 'lodash';
import {
  Entry,
  EntryType,
  BaseEntry,
  Gender,
  NewEntry,
  NewPatient,
  Patient,
  Discharge,
  DateRange,
  HealthCheckRating,
} from './types';

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const toString = (str: unknown): string => {
  if (!str || !isString(str)) throw new Error("Couldn't convert to string ");
  return str;
};

const toNumber = (n: unknown): number => {
  if (!isNumber(n)) throw new Error("couldn't convert to number");
  return n;
};

const parseDate = (date: unknown): string => {
  const str = toString(date);
  if (!isDate(str)) throw new Error('Date is not valid');
  return str;
};

const isDate = (date: string): boolean => Boolean(Date.parse(date));

const parseGender = (gender: unknown): Gender => {
  const str = toString(gender);
  if (!isGender(str)) throw new Error('Incorrect or missing gender');
  return str;
};

const toEntries = (str: unknown): Entry[] => {
  if (!str || !Array.isArray(str)) return [];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return str.map(entry => convertToEntry(entry));
};

const parseDiagnosisCodes = (str: unknown): string[] | undefined => {
  if (!str || !Array.isArray(str)) return undefined;
  return str.map((entry) => toString(entry));
};

const parseType = (type: unknown): EntryType => {
  const str = toString(type);
  if (!isEntryType(str)) throw new Error('incorrect or missing entry');
  return str;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (type: any): type is EntryType =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  Object.values(EntryType).includes(type);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  Object.values(Gender).includes(gender);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseSsn = (ssn: any): string => {
  const str = toString(ssn);
  if (!isValidFinnishSsn(str)) throw new Error('Invalid ssn ' + str);
  return str;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isObject = (obj: any) : obj is Record<string, unknown> =>typeof obj === 'object' && obj !== null && obj !== undefined;
const objectHasAttributes = (obj: Record<string, unknown>, attributes: string[]): boolean => attributes.map(a => a in obj).every(b => b);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDischarge = (discharge: any): Discharge => {
  if (!isObject(discharge) || !objectHasAttributes(discharge, ['date', 'criteria'])) throw new Error('Incorrect or missing discharge ' + JSON.stringify(discharge));
  return {
    date: parseDate(discharge.date),
    criteria: toString(discharge.criteria),
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDateRange = (dateRange: any): DateRange => {
  if (!isObject(dateRange)) throw new Error('Incorrect dateRange');
  if  (!objectHasAttributes(dateRange, ['startDate', 'endDate'])) throw new Error('Incorrect or missing dateRange');
  return {
    startDate: parseDate(dateRange.startDate),
    endDate: toString(dateRange.endDate),
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
const isHealthCheckRating = (rating: any): rating is HealthCheckRating => Object.values(HealthCheckRating).includes(rating);

const parseHealthCheckRating = (rating : unknown) : HealthCheckRating => {
  const str = toNumber(rating);
  if (!isHealthCheckRating(str)) throw new Error('Incorrect or missing healthCheckRating');
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
  entries: unknown;
};

type NewPatientFields = Omit<PatientFields, 'id' | 'entries'>;

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
  entries,
}: PatientFields): Patient => {
  const temp = convertToNewPatient({
    name,
    dateOfBirth,
    gender,
    ssn,
    occupation,
  }) as Patient;
  temp.id = toString(id);
  temp.entries = toEntries(entries);
  return temp;
};

interface NewEntryFieldsBase {
  type: unknown;
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes?: unknown;
}

interface HealthCheckEntryFields extends NewEntryFieldsBase {
  healthCheckRating: unknown;
}

interface HospitalEntryFields extends NewEntryFieldsBase {
  discharge: unknown;
}

interface OccupationalHealthcareEntryFields extends NewEntryFieldsBase {
  employerName: unknown;
  sickLeave?: unknown;
}

type EntryFields =
  & HealthCheckEntryFields
  & HospitalEntryFields
  & OccupationalHealthcareEntryFields;

export const convertToEntry = ({  
  id,
  type,
  description,
  date,
  specialist,
  diagnosisCodes,
  sickLeave,
  employerName,
  discharge,
  healthCheckRating,
}: EntryFields & {'id': string} ): Entry => {
  const entry = convertToNewEntry({type,
    description,
    date,
    specialist,
    diagnosisCodes,
    sickLeave,
    employerName,
    discharge,
    healthCheckRating}) as Entry;
    entry.id = toString(id);
    return entry;
};


export const convertToNewEntry = ({
  type,
  description,
  date,
  specialist,
  diagnosisCodes,
  sickLeave,
  employerName,
  discharge,
  healthCheckRating,
}: EntryFields): NewEntry => {
  const entryType: EntryType = parseType(type);
  switch (entryType) {
    case EntryType.HealthCheck:
      return convertToHealthCheckEntry({
        description,
        date,
        specialist,
        diagnosisCodes,
        healthCheckRating,
      });
    case EntryType.Hospital:
      return convertToHospitalEntry({description, date, specialist, diagnosisCodes, discharge});
    case EntryType.OccupationalHealthcare:
      return convertToOccupationHealthCareEntry({description, date, specialist, diagnosisCodes, sickLeave, employerName});
    default:
      return assertNever(entryType);
  }
};

const convertToHealthCheckEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
  healthCheckRating,
}: Omit<HealthCheckEntryFields, 'type'>): NewEntry => {
  const entry = convertToBaseEntry({
    description,
    date,
    specialist,
    diagnosisCodes,
  });
  return {
    type: EntryType.HealthCheck,
    ...entry,
    healthCheckRating: parseHealthCheckRating(healthCheckRating),
  };
};

const convertToHospitalEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
  discharge,
}: Omit<HospitalEntryFields, 'type'>): NewEntry => {
  const baseEntry = convertToBaseEntry({
    description,
    date,
    specialist,
    diagnosisCodes,
  });

  return {
    type: EntryType.Hospital,
    ...baseEntry,
    discharge: parseDischarge(discharge),
  };
};

const convertToOccupationHealthCareEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
  sickLeave,
  employerName,
}: Omit<OccupationalHealthcareEntryFields, 'type'>): NewEntry => {
  const baseEntry = convertToBaseEntry({
    description,
    date,
    specialist,
    diagnosisCodes,
  });
  const entry: NewEntry = {
    type: EntryType.OccupationalHealthcare,
    ...baseEntry,
    employerName: toString(employerName)
  };
  if (sickLeave) 
    entry.sickLeave = parseDateRange(sickLeave);
  return entry;
};

type NewBaseEntry = Omit<BaseEntry, 'id'>;

const convertToBaseEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
}: Omit<NewEntryFieldsBase, 'type'>): NewBaseEntry => {
  const entry: NewBaseEntry = {
    description: toString(description),
    date: parseDate(date),
    specialist: toString(specialist),
  };
  const dCodes = parseDiagnosisCodes(diagnosisCodes);
  if (dCodes) entry.diagnosisCodes = dCodes;
  return entry;
};
