import { Typography, TypographyProps } from '@material-ui/core';
import { Entry, EntryType } from '../types';
import { assertNever } from '../utils';

const EntryDetails = ({ entry }: { entry: Entry }) => {
  const Text = (props: TypographyProps) => (
    <Typography variant="body2" color="textPrimary" gutterBottom {...props} />
  );

  const specific = () => {
    switch (entry.type) {
      case EntryType.HealthCheck:
        return <Text>Condition: {entry.healthCheckRating.toString()}</Text>;
      case EntryType.Hospital:
        return (
          <Text>
            Discharge in {entry.discharge.date} if {entry.discharge.criteria}
          </Text>
        );
      case EntryType.OccupationalHealthcare:
        return (
          <div>
            <Text>Employer: {entry.employerName} </Text>
            {entry.sickLeave ? (
              <Text>
                Sick leave: {entry.sickLeave.startDate} -{' '}
                {entry.sickLeave.endDate}
              </Text>
            ) : (
              ''
            )}
          </div>
        );
      default:
        return assertNever(entry);
    }
  };

  return (
    <div style={{ margin: 5 }}>
      <Text>Diagnosed by {entry.specialist}</Text>
      {specific()}
    </div>
  );
};

export default EntryDetails;
