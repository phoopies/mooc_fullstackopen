import { useState } from 'react';
import TextInput from './TextInput';

const BlogForm = ({ addBlog }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const createBlog = async (e) => {
        e.preventDefault();
        addBlog(title, author, url);
        setTitle('');
        setAuthor('');
        setUrl('');
    };

    return (
        <form onSubmit={createBlog}>
            <h2>Create a new blog</h2>
            <TextInput text='title' value={title} onChange={value => setTitle(value)} placeholder='title'/>
            <TextInput text='author' value={author} onChange={value => setAuthor(value)} placeholder='author'/>
            <TextInput text='url' value={url} onChange={value => setUrl(value)} placeholder='url'/>
            <input type='submit' value='create'/>
        </form>
    );
};

export default BlogForm;