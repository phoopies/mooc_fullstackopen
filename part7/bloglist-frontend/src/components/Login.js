import { useState } from 'react';
import { setNotification } from '../reducers/notificationReducer';
import TextInput from './TextInput';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/userReducer';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const onSubmit = async (e) => {
        e.preventDefault();

        dispatch(login({ username, password })); // TODO handle errors
        dispatch(setNotification(`${username} logged in`, 'green', 5));
        setUsername('');
        setPassword('');
        // dispatch(setNotification('Wrong credentials!', 'red', 5));
    };

    return (
        <form onSubmit={onSubmit}>
            <h2>Login to start creating blogs</h2>
            <TextInput
                text="username"
                value={username}
                id="username"
                onChange={(value) => setUsername(value)}
            />
            <TextInput
                text="password"
                value={password}
                id="password"
                onChange={(value) => setPassword(value)}
            />
            <button id="login-btn" type="submit">
                Login
            </button>
        </form>
    );
};

export default Login;
