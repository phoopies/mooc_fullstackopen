import { createBlog } from '../reducers/blogReducer';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import TextInput from './TextInput';
import { setNotification } from '../reducers/notificationReducer';

const BlogForm = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const dispatch = useDispatch();

    const create = async (e) => {
        e.preventDefault();
        dispatch(createBlog({ title, author, url }));
        dispatch(setNotification(`Created ${title}`), 'green', 5);
        setTitle('');
        setAuthor('');
        setUrl('');
    };

    return (
        <form onSubmit={create}>
            <h2>Create a new blog</h2>
            <TextInput
                text="title"
                id="title"
                value={title}
                onChange={(value) => setTitle(value)}
                placeholder="title"
            />
            <TextInput
                text="author"
                id="author"
                value={author}
                onChange={(value) => setAuthor(value)}
                placeholder="author"
            />
            <TextInput
                text="url"
                id="url"
                value={url}
                onChange={(value) => setUrl(value)}
                placeholder="url"
            />
            <input type="submit" value="create" id="create-blog-btn" />
        </form>
    );
};

export default BlogForm;
