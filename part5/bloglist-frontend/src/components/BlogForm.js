import { useState } from 'react';
import TextInput from './TextInput';
import BlogService from '../services/blogs';

const BlogForm = ({ addBlog }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const createBlog = async (e) => {
        e.preventDefault();

        const res = await BlogService.create(title, author, url);
        addBlog(res.data);
        setTitle('');
        setAuthor('');
        setUrl('');
    };

    return (
        <form onSubmit={createBlog}>
            <h2>Create a new blog</h2>
            <TextInput text='title' value={title} onChange={value => setTitle(value)}/>
            <TextInput text='author' value={author} onChange={value => setAuthor(value)}/>
            <TextInput text='url' value={url} onChange={value => setUrl(value)}/>
            <input type='submit' value='create'/>
        </form>
    );
};

export default BlogForm;