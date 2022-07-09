import FormModal from "../components/FormModal";
import AddEntryForm, { EntryFormValues } from "./AddEntryForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <FormModal error={error} onClose={onClose} modalOpen={modalOpen} title="Add a new entry">
      <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
  </FormModal>
);

export default AddEntryModal;