import {
    Box,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Link,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Users = () => {
    const users = useSelector(state => state.users);
    return (
        <Box>
            <Typography variant="h4" gutterBottom component="div">
                Users
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Blogs created</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {[...users].sort((a,b) => b.blogs.length - a.blogs.length).map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>
                                <Link component={RouterLink} to={`/${user.id}`}>
                                    {user.name}
                                </Link>
                            </TableCell>
                            <TableCell>{user.blogs.length}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default Users;
