import { Alert } from '@mui/material';
import { useSelector } from 'react-redux';

const Notification = () => {
    const { message, severity, active } = useSelector(
        (state) => state.notification
    );

    return active ? (
        <Alert severity={severity} className="notification" sx={{ margin: 2, padding: 1 }}>
            {message}
        </Alert>
    ) : null;
};

export default Notification;
