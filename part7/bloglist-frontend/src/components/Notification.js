import { useSelector } from 'react-redux';

const Notification = () => {
    const { message, color, active } = useSelector(
        (state) => state.notification
    );

    const style = {
        border: `3px solid ${color}`,
        borderRadius: 5,
        color: color,
        backgroundColor: '#eeee',
        width: '60%',
        margin: 5,
        padding: 5,
    };

    return active ? (
        <div style={style} className="notification">
            <p>{message}</p>
        </div>
    ) : null;
};

export default Notification;
