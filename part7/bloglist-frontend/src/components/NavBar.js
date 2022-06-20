import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import ToolBar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import LoginModal from './LoginModal';
import { logout } from '../reducers/loginReducer';
import { setNotification } from '../reducers/notificationReducer';

const NavBar = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.login);
    const [loginOpen, setLoginOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(setNotification(`${user.name} logged out`, 'success', 5));
    };

    return (
        <Box sx={{ flexGrow: 1 }} mb={2}>
            <AppBar position="static">
                <ToolBar>
                    <Box sx={{ flexGrow: 1 }}>
                        <Button color="inherit" component={Link} to="/">
                            Blogs
                        </Button>
                        <Button color="inherit" component={Link} to="/users">
                            Users
                        </Button>
                    </Box>
                    {user ? (
                        <Box>
                            <Button
                                size="large"
                                component={Link}
                                to={`/users/${user.id}`}
                                color="inherit"
                                startIcon={<AccountCircle />}
                            >
                                {user.name}
                            </Button>
                            <Button
                                size="small"
                                color="inherit"
                                variant="outlined"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </Box>
                    ) : (
                        <Button
                            color="inherit"
                            variant="outlined"
                            onClick={() => setLoginOpen(true)}
                        >
                            Login
                        </Button>
                    )}
                </ToolBar>
            </AppBar>
            <LoginModal open={loginOpen} setOpen={setLoginOpen} />
        </Box>
    );
};

export default NavBar;
