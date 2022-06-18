import userService from '../services/users';
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: [],
    reducers: {
        setUsers(_state, action) {
            return action.payload;
        },
    },
});

export const initializeusers = () => {
    return async (dispatch) => {
        const users = await userService.getAll();
        dispatch(setUsers(users));
    };
};

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;
