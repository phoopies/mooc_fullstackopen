import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification(_state, action) {
            return action.payload;
        },
        deleteNotification(_state, _action) {
            return '';
        }
    },
});

export const { setNotification, deleteNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
