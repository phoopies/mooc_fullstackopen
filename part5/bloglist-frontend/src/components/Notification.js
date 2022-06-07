const Notification = ({ message, color }) => {
    const style = {
        border: `3px solid ${color}`,
        borderRadius: 5,
        color: color,
        backgroundColor: '#eeee',
        width: '60%',
        margin: 5,
        padding: 5,
    };

    return (
        message === null || message === undefined || message === '' ? null :
            <div style={style}>
                <p>{message}</p>
            </div>
    );
};

Notification.defaultProps = {
    clearTimeMs: 3500,
    color: 'orange',
};

export default Notification;