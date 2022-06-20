import {
    Box,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    Typography,
} from '@mui/material';

const UserView = ({ user }) => {
    return user ? (
        <Box mt={1}>
            <Typography variant="h5">User: {user.name}</Typography>
            <List
                dense={true}
                subheader={<ListSubheader component="div">Blogs</ListSubheader>}
            >
                {user.blogs.map((blog) => (
                    <ListItem key={blog.id}>
                        <ListItemText
                            primary={blog.title}
                            secondary={blog.url}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    ) : (
        <CircularProgress />
    );
};

export default UserView;
