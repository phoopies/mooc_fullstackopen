import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import ToolBar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <Box sx={{ flexGrow: 1 }} mb={2}>
            <AppBar position="static">
                <ToolBar>
                    <Button color="inherit" component={Link} to="/">
                        Blogs
                    </Button>
                    <Button color="inherit" component={Link} to="/users">
                        Users
                    </Button>
                </ToolBar>
            </AppBar>
        </Box>
    );
};

export default NavBar;
