import { useState } from 'react';
import TextInput from './TextInput';
import BlogService from '../services/blogs';

const BlogForm = ({ setBlogs, addNotification }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const createBlog = async (e) => {
        e.preventDefault();

        const blog = await BlogService.create(title, author, url);
        setBlogs(prev => ([...prev, blog]));
        addNotification(`${title} added by ${author}`, 'green');
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