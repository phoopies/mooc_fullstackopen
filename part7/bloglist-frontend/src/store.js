import notificationReducer from './reducers/notificationReducer';
import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './reducers/blogReducer';
import loginReducer from './reducers/loginReducer';
import userReducer from './reducers/userReducer';

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogReducer,
        users: userReducer,
        login: loginReducer,
    }
});

export default store;