import React from 'react';
import { Dialog, DialogTitle, DialogContent, Divider } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

interface Props {
  title: string;
  modalOpen: boolean;
  onClose: () => void;
  error?: string;
  children: JSX.Element;
}

const FormModal = ({title, modalOpen, onClose, error, children }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={onClose}>
    <DialogTitle>{title}</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
      {children}
    </DialogContent>
  </Dialog>
);

export default FormModal;
