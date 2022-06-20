import { createBlog } from '../reducers/blogReducer';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { Typography, Input, Stack, Button } from '@mui/material';

const BlogForm = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const dispatch = useDispatch();

    const create = e => {
        e.preventDefault();
        dispatch(createBlog({ title, author, url }));
        dispatch(setNotification(`Created ${title}`, 'success', 5));
        setTitle('');
        setAuthor('');
        setUrl('');
    };

    const canCreate = () => title && author && url;

    return (
        <Stack component="form" onSubmit={create} spacing={1} mb={2}>
            <Typography variant="h3">Create a new blog</Typography>
            <Input
                text="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="title"
            />
            <Input
                text="author"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="author"
            />
            <Input
                text="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="url"
            />
            <Button disabled={!canCreate()} type="submit" id="create-blog-btn" variant='contained'>
                Create
            </Button>
        </Stack>
    );
};

export default BlogForm;
