import loginService from '../services/login';
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        removeUser(_state, _action) {
            return '';
        },
        setUser(_state, action) {
            return action.payload;
        },
    },
});

export const login = (user) => {
    return async (dispatch) => {
        const loggedUser = await loginService.login(
            user.username,
            user.password
        );
        dispatch(setUser(loggedUser));
    };
};

export const logout = () => {
    return async dispatch => {
        await loginService.logout();
        dispatch(removeUser());
    };
};

export const initializeUser = () => {
    return async (dispatch) => {
        const user = await loginService.getUser();
        dispatch(setUser(user));
    };
};

export const { removeUser, setUser } = userSlice.actions;
export default userSlice.reducer;
