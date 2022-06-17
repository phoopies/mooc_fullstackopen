import { createSlice } from '@reduxjs/toolkit';

let timeoutId;

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        message: '',
        color: 'grey',
        active: false,
    },
    reducers: {
        setNewNotification(state, action) {
            return {
                ...state,
                message: action.payload.message,
                color: action.payload.color,
                active: true,
            };
        },
        deleteNotification(state, _action) {
            return { ...state, active: false };
        },
    },
});

export const setNotification = (message, color, timeSeconds) => {
    return (dispatch) => {
        dispatch(setNewNotification({ message, color }));
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
