import { TextField, Dialog, DialogContent, DialogTitle, DialogActions, Button } from '@mui/material';
import { useState } from 'react';
import { setNotification } from '../reducers/notificationReducer';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/loginReducer';

const LoginModal = ({ open, setOpen }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();

        dispatch(login({ username, password })); // TODO handle errors
        dispatch(setNotification(`${username} logged in`, 'success', 5));

        // dispatch(setNotification('Wrong credentials!', 'red', 5));
        handleClose();
    };

    const handleClose = () => {
        setUsername('');
        setPassword('');

        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    value={username}
                    margin="dense"
                    id="username"
                    type="username"
                    label="Username"
                    fullWidth
                    variant="standard"
                    onChange={(event) => setUsername(event.target.value)}
                />
                <TextField
                    value={password}
                    margin="dense"
                    id="password"
                    type="password"
                    label="Password"
                    fullWidth
                    variant="standard"
                    onChange={(event) => setPassword(event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleLogin}>Login</Button>
            </DialogActions>
        </Dialog>
    );
};

export default LoginModal;
