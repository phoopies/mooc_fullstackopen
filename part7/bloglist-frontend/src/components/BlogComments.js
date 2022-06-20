import {
    List,
    ListItem,
    ListItemText,
    Typography,
    Box,
    TextField,
    Stack,
    Button,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { commentBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';

const BlogComments = ({ blog }) => {
    const dispatch = useDispatch();

    const [comment, setComment] = useState('');
    const comments = blog.comments;

    const handleNewComment = (e) => {
        e.preventDefault();
        dispatch(commentBlog(blog, comment));
        dispatch(setNotification(`You commented "${comment}"!`, 'success', 3));
        setComment('');
    };

    return (
        <Box>
            <Typography sx={{ mt: 2, mb: 1 }} variant="h6" component="div">
                Comments
            </Typography>
            <Stack
                direction="row"
                spacing={2}
                component="form"
                onSubmit={handleNewComment}
            >
                <TextField
                    value={comment}
                    id="comment"
                    label="Write a comment"
                    fullWidth
                    variant="standard"
                    onChange={(event) => setComment(event.target.value)}
                />
                <Button type="submit" variant="contained">
                    Send
                </Button>
            </Stack>

            {comments.length > 0 ? (
                <List dense={true}>
                    {comments.map((c, i) => (
                        <ListItem key={i}>
                            <ListItemText primary={c} />
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
