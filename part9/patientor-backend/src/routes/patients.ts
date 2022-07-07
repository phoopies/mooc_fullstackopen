import express from 'express';
import patientService from '../services/patientService';
import { convertToNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getAllPublicPatients());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getById(req.params.id);
  if (!patient) res.sendStatus(404);
  else res.send(patient);
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = convertToNewPatient(req.body);
    const patient = patientService.addNewPatient(newPatient);
    res.json(patient);
  } catch (e: unknown) {
    let errorMessage = 'Something went wrong.';
    if (e instanceof Error) {
      errorMessage += ' Error: ' + e.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
