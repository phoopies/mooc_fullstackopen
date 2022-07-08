import { Entry } from '../types';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import WorkIcon from '@material-ui/icons//Work';
import { assertNever } from '../utils';

const EntryLogo = ({ entry }: { entry: Entry }) => {
    switch (entry.type) {
      case "HealthCheck":
          return <RemoveRedEyeIcon />;
      case "Hospital":
          return <LocalHospitalIcon />;
      case "OccupationalHealthcare":
          return <WorkIcon />;
      default:
          return assertNever(entry);
    }
  };

  export default EntryLogo;