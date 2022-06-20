import { useSelector } from 'react-redux';
import { Box, List, Typography, ListItemButton, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const BlogList = () => {
    const blogs = useSelector((state) => state.blogs);

    return (
        <Box>
            <Typography variant="h2">blogs</Typography>
            <List id="blogs">
                {[...blogs]
                    .sort((a, b) => b.likes - a.likes)
                    .map((blog) => (
                        <ListItemButton key={blog.id} component={Link} to={`/blogs/${blog.id}`}>
                            <ListItemText>{blog.title}</ListItemText>
                        </ListItemButton>
                    ))}
            </List>
        </Box>
    );
};

export default BlogList;
