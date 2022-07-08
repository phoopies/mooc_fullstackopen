import patients from '../../data/patients';
import { Entry, NewEntry, NewPatient, Patient, PublicPatient } from '../types';
import _, { uniqueId } from 'lodash';

const getAll = (): Patient[] => patients;

const getAllPublicPatients = (): PublicPatient[] =>
  patients.map((p) => _.omit(p, ['ssn', 'entries']));

const addNewPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uniqueId(),
    entries: [],
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patient: Patient, entry: NewEntry): Patient => {
  const newEntry: Entry = { id: uniqueId(), ...entry };
  patient.entries.push(newEntry);
  return patient;
};

const getById = (id: string): Patient | undefined => {
  return patients.find(p => id === p.id);
};

export default {
  getAll,
  getAllPublicPatients,
  addNewPatient,
  getById,
  addEntry,
};
