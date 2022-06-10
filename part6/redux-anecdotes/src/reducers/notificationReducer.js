import { createSlice } from '@reduxjs/toolkit';

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
    return dispatch => {
        dispatch(setNewNotification(notification));
        setTimeout(() => {
            dispatch(deleteNotification());
        }, timeSeconds * 1000);
    };
};

export const { deleteNotification, setNewNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
