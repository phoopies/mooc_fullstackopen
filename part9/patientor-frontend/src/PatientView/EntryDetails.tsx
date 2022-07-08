import { Typography, TypographyProps } from '@material-ui/core';
import { Entry } from '../types';
import { assertNever } from '../utils';

const EntryDetails = ({ entry }: { entry: Entry }) => {
  const Text = (props : TypographyProps) => (
    <Typography variant="body2" color="textPrimary" gutterBottom {...props} />
  );

  const specific = () => {
    switch (entry.type) {
      case 'HealthCheck':
        return (
          <Text>
            Condition: {entry.healthCheckRating.toString()}
          </Text>
        );
      case 'Hospital':
        return (
          <Text>
            Discharge in {entry.discharge.date} if {entry.discharge.criteria}
          </Text>
        );
      case 'OccupationalHealthcare':
        return (
          <Text>
            Employer: {entry.employerName}{' '}
            {entry.sickLeave ? (
              <Text>
                Sick leave: {entry.sickLeave.startDate} -{' '}
                {entry.sickLeave.endDate}
              </Text>
            ) : (
              ''
            )}
          </Text>
        );
      default:
        return assertNever(entry);
    }
  };

  return (
    <div style={{margin: 5}}>
      <Text>
        Diagnosed by {entry.specialist}
      </Text>
      {specific()}
    </div>
  );
};

export default EntryDetails;
