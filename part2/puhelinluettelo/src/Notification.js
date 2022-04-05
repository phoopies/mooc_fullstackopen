import { useEffect, useRef } from "react";

// Instead of color could have different types of notifications, AlertNotification component etc which would return Notification with correct values.
const Notification = ({message, setMessage, clearTimeMs, color}) => {
    const timerId = useRef(-1);
    const style = {
        border: `3px solid ${color}`,
        borderRadius: 5,
        color: color,
        backgroundColor: '#eeee',
        width: '60%',
        margin: 5,
        padding: 5,
    };

    useEffect(() => {
        if (clearTimeMs <= 0) return; // Don't automatically reset
        clearTimeout(timerId.current);
        timerId.current = setTimeout(() => setMessage(null), clearTimeMs);
    }, [message, setMessage, clearTimeMs]);

    return (
        message === null || message === undefined || message === "" ? null :
        <div style={style}>
            <p>{message}</p>
        </div>
    );
}

Notification.defaultProps = {
    clearTimeMs: 3500,
    color: 'orange',
};

export default Notification;