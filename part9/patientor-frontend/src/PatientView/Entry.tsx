import {
  Card,
  CardContent,
  Divider,
  Typography,
  Grid,
} from '@material-ui/core';
import { useStateValue } from '../state';
import { Entry as EntryType } from '../types';
import EntryDetails from './EntryDetails';
import EntryLogo from './EntryLogo';

const Entry = ({ entry }: { entry: EntryType }) => {
    const [{diagnoses}] = useStateValue();
  return (
    <Card>
      <CardContent>
      <Grid container justifyContent="space-between" direction="row">
        <Typography color="textSecondary" gutterBottom>
          {entry.date}
        </Typography>
        <EntryLogo entry={entry} />
        </Grid>
        <Typography variant="body2">{entry.description}</Typography>
        <Divider />
        <Grid container spacing={4} style={{margin:5}}>
          {entry.diagnosisCodes?.map((code) => (
            <Grid item key={code} xs="auto">
              <Card style={{minWidth: 100, maxWidth: 300, padding: 5}}>
                <Typography color="textPrimary">
                  {code}
                </Typography >
                <Typography variant="body1" color="textSecondary">
                    {diagnoses[code] ? diagnoses[code].name : "unknown diagnose"}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Divider />
        <EntryDetails entry={entry} />
      </CardContent>
    </Card>
  );
};

export default Entry;
