import { Grid, Button } from '@material-ui/core';
import { Field, Formik, Form, isString } from 'formik';

import {
  TextField,
  SelectField,
  EntryOption,
  HealthCheckOption,
  DiagnosisSelection,
} from '../components/FormField';
import { useStateValue } from '../state';
import { EntryType, HealthCheckRating } from '../types';
import { assertNever } from '../utils';

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type EntryFormValues = {
  type: EntryType;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: string[];
  healthCheckRating: HealthCheckRating;
  dischargeDate: string;
  criteria: string;
  employerName: string;
  sickLeaveStart: string;
  sickLeaveEnd: string;
};

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const EntryOptions: EntryOption[] = Object.entries(EntryType).map((entry) => ({
  label: entry[0],
  value: entry[1],
}));

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{diagnoses}] = useStateValue();

  const entryDetails = (type: EntryType): JSX.Element => {
    switch (type) {
      case EntryType.HealthCheck:
        const options: HealthCheckOption[] = Object.entries(HealthCheckRating)
          .filter((entry) => !isString(entry[1])) // reverse mapping -> remove "duplicates"
          .map((entry) => ({
            label: entry[0],
            value: entry[1] as HealthCheckRating,
          }));
        return (
          <div>
            <SelectField
              label="HealthCheckRating"
              name="healthCheckRating"
              options={options}
            />
          </div>
        );
      case EntryType.Hospital:
        return (
          <div>
            <Field
              label="Discharge date"
              placeholder="YYYY-MM-DD"
              name="dischargeDate"
              component={TextField}
            />
            <Field
              label="Discharge criteria"
              placeholder=""
              name="criteria"
              component={TextField}
            />
          </div>
        );
      case EntryType.OccupationalHealthcare:
        return (
          <div>
            <Field
              label="Employer name"
              placeholder=""
              name="employerName"
              component={TextField}
            />
            <Grid container direction="row" spacing={2}>
              <Grid item xs={6}>
                <Field
                  label="Sick leave start date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeaveStart"
                  component={TextField}
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  label="Sick leave end date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeaveEnd"
                  component={TextField}
                />
              </Grid>
            </Grid>
          </div>
        );
      default:
        return assertNever(type);
    }
  };

  const today: string = new Date().toISOString().split('T')[0];

  return (
    <Formik
      initialValues={{
        type: EntryType.HealthCheck,
        description: '',
        date: today,
        specialist: '',
        diagnosisCodes: [],
        healthCheckRating: HealthCheckRating.Healthy,
        dischargeDate: '',
        criteria: '',
        employerName: '',
        sickLeaveStart: today,
        sickLeaveEnd: '',
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        let requiredFields: (keyof typeof values)[] = ['description', 'date', 'specialist', 'diagnosisCodes'];
        switch (values.type) {
          case EntryType.HealthCheck:
            requiredFields = [...requiredFields];
            break;
          case EntryType.Hospital:
            requiredFields = [...requiredFields, 'dischargeDate' ,'criteria'];
            break;
          case EntryType.OccupationalHealthcare:
            requiredFields = [...requiredFields, 'employerName', 'sickLeaveStart','sickLeaveEnd'];
            break;
          default:
            assertNever(values.type);
        }
        requiredFields.forEach(field => {
          if (!values[field]) {
            errors[field] = requiredError;
          }
        });
        return errors;
      }}
    >
      {({ isValid, dirty, values, setFieldTouched, setFieldValue }) => {
        return (
          <Form className="form ui">
            <SelectField label="Type" name="type" options={EntryOptions} />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          />   
            {entryDetails(values.type)}
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: 'left' }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: 'right',
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
