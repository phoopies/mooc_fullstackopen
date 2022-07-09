import { Entry, EntryType } from '../types';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import WorkIcon from '@material-ui/icons//Work';
import { assertNever } from '../utils';

const EntryLogo = ({ entry }: { entry: Entry }) => {
    switch (entry.type) {
      case EntryType.HealthCheck:
          return <RemoveRedEyeIcon />;
      case EntryType.Hospital:
          return <LocalHospitalIcon />;
      case EntryType.OccupationalHealthcare:
          return <WorkIcon />;
      default:
          return assertNever(entry);
    }
  };

  export default EntryLogo;