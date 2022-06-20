import { List, ListItem, ListItemText, Typography, Box } from '@mui/material';

const BlogComments = ({ comments }) => {
    return (
        <Box>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                Comments
            </Typography>
            {comments.length > 0 ? (
                <List dense={true}>
                    {comments.map((comment, i) => (
                        <ListItem key={i}>
                            <ListItemText primary={comment} />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography>Go ahead, write the first comment!</Typography>
            )}
        </Box>
    );
};

export default BlogComments;
