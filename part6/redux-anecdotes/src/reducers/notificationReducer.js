import { createSlice } from '@reduxjs/toolkit';

let timeoutId;

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNewNotification(_state, action) {
            return action.payload;
        },
        deleteNotification(_state, _action) {
            return '';
        }
    },
});

export const setNotification = (notification, timeSeconds) => {
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    return dispatch => {
        dispatch(setNewNotification(notification));
        timeoutId = setTimeout(() => {
            dispatch(deleteNotification());
        }, timeSeconds * 1000);
    };
};

export const { deleteNotification, setNewNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
