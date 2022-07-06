import patients from "../../data/patients";
import { Patient, PublicPatient } from "../types";
import _ from "lodash";

const getAll = (): Patient[] => patients;

const getAllWithoutSsn = (): PublicPatient[] => patients.map(p => _.omit(p, 'ssn'));

export default {
  getAll,
  getAllWithoutSsn
};
