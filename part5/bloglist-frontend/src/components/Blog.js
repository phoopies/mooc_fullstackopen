import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, setBlogs }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    // Not sure why the assigment says that the whole blog has to be sent to the server
    const like = async () => {
        blog.likes++;
        const updatedBlog = await blogService.update(blog);
        setBlogs(prev => prev
            .map(b => b.id === updatedBlog.id ? updatedBlog : b)
            .sort((a, b) => b.likes - a.likes) // Would be enough to move the updated blog
        );
    };

    return (
        <div
            style={{ border: '2px solid black', padding: 5, background: isHovered ? 'grey' : '' }}
            // onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <h4>{blog.title}</h4>
            {showDetails && <div style={{ marginBottom: 15 }}>
                <a href={blog.url}>{blog.url}</a>
                <div>
                    likes {blog.likes}
                    <button onClick={like}>like</button>
                </div>
                <div>{blog.author}</div>
            </div>
            }
            <button
                onClick={() => {
                    setShowDetails(!showDetails);
                }}>
                {showDetails ? 'close' : 'view'}
            </button>
        </div>
    );
};

export default Blog;