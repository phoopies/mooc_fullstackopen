import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Grid, Typography } from '@material-ui/core';

import { Patient } from '../types';
import { apiBaseUrl } from '../constants';
import HealthRatingBar from '../components/HealthRatingBar';
import { useParams } from 'react-router-dom';
import { updatePatient, useStateValue } from '../state';
import Entry from './Entry';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import AddEntryModal from '../AddEntryModal';

const PatientView = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      console.log(values);
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        values
      );
      dispatch(updatePatient(updatedPatient));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || 'Unrecognized axios error');
        setError(
          String(e?.response?.data?.error) || 'Unrecognized axios error'
        );
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  if (!id) return <div>Something went wrong</div>;

  const patient = patients[id];

  if (!patient) return <div>Patient not found :(</div>;

  useEffect(() => {
    const getPatientDetails = async () => {
      try {
        const { data: completePatient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );

        dispatch(updatePatient(completePatient));
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          console.error(e?.response?.data || 'Unrecognized axios error');
        } else {
          console.error('Unknown error', e);
        }
      }
    };
    const isPatientInState = (): boolean => patient.ssn !== undefined;

    if (!isPatientInState()) void getPatientDetails();
  }, []);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid xs={4} container item direction="column">
          <Typography>Name</Typography>
          <Typography>Ssn</Typography>
          <Typography>Gender</Typography>
          <Typography>Occupation</Typography>
          <Typography>Health Rating</Typography>
        </Grid>
        <Grid xs={8} container item direction="column">
          <Typography>{patient.name}</Typography>
          <Typography>{patient.ssn}</Typography>
          <Typography>{patient.gender}</Typography>
          <Typography>{patient.occupation}</Typography>
          <HealthRatingBar showText={false} rating={1} />
        </Grid>
      </Grid>
      <Grid container direction="column" spacing={2}>
        {patient.entries?.map((entry) => (
          <Grid item key={entry.id}>
            <Entry entry={entry} />
          </Grid>
        ))}
      </Grid>
      <AddEntryModal
        error={error}
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={submitNewEntry}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientView;
