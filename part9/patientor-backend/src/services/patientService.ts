import patients from "../../data/patients";
import { NewPatient, Patient, PublicPatient } from "../types";
import _, { uniqueId } from "lodash";

const getAll = (): Patient[] => patients;

const getAllWithoutSsn = (): PublicPatient[] => patients.map(p => _.omit(p, 'ssn'));

const addNewPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uniqueId(),
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
}

export default {
  getAll,
  getAllWithoutSsn,
  addNewPatient
};
