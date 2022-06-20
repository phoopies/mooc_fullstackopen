import { Alert } from '@mui/material';
import { useSelector } from 'react-redux';

const Notification = () => {
    const { message, severity, active } = useSelector(
        (state) => state.notification
    );

    return active ? (
        <Alert severity={severity} className="notification">
            {message}
        </Alert>
    ) : null;
};

export default Notification;
