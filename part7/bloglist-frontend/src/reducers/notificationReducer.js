import { createSlice } from '@reduxjs/toolkit';

let timeoutId;

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        message: '',
        severity: '',
        active: false,
    },
    reducers: {
        setNewNotification(_state, action) {
            return {
                message: action.payload.message,
                severity: action.payload.severity,
                active: true,
            };
        },
        deleteNotification(state, _action) {
            return { ...state, active: false };
        },
    },
});

export const setNotification = (message, severity, timeSeconds) => {
    return (dispatch) => {
        dispatch(setNewNotification({ message, severity }));
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            dispatch(deleteNotification());
        }, timeSeconds * 1000);
    };
};

export const { deleteNotification, setNewNotification } =
    notificationSlice.actions;

export default notificationSlice.reducer;
