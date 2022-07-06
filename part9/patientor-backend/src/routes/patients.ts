import express from "express";
import patientService from "../services/patientService";
import { convertToNewPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getAllWithoutSsn());
});

router.post("/", (req, res) => {
  try {
    const newPatient = convertToNewPatient(req.body);
    const patient = patientService.addNewPatient(newPatient);
    res.json(patient);
  } catch (e: unknown) {
    let errorMessage = "Something went wrong.";
    if (e instanceof Error) {
      errorMessage += " Error: " + e.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
