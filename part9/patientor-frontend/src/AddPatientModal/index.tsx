import AddPatientForm, { PatientFormValues } from "./AddPatientForm";
import FormModal from "../components/FormModal";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: PatientFormValues) => void;
  error?: string;
}

const AddPatientModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <FormModal error={error} onClose={onClose} modalOpen={modalOpen} title="Add a new patient">
      <AddPatientForm onSubmit={onSubmit} onCancel={onClose} />
  </FormModal>
);

export default AddPatientModal;