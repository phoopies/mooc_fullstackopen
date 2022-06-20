import loginService from '../services/login';
import blogService from '../services/blogs';
import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name: 'loggedUser',
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
        blogService.setToken(user.token);
        dispatch(setUser(user));
    };
};

export const { removeUser, setUser } = loginSlice.actions;
export default loginSlice.reducer;
