import { useState } from 'react';
import { setNotification } from '../reducers/notificationReducer';
import loginService from '../services/login';
import TextInput from './TextInput';
import { useDispatch } from 'react-redux';

const Login = ({ setUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const user = await loginService.login(username, password);
            setUser(user);
            dispatch(setNotification(`${user.name} logged in`, 'green', 5));
            setUsername('');
            setPassword('');
            console.log('Logged in as ' + user.name);
        } catch (exception) {
            console.log('Wrong credentials');
            dispatch(setNotification('Wrong credentials!', 'red', 5));
        }
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
