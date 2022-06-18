import { Box, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const User = ({ user }) => {
    return (
        <Box mt={1}>
            <Link component={RouterLink} to="/">
                {user.name}
            </Link>
        </Box>
    );
};

export default User;