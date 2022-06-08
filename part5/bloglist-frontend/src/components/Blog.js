import { useState } from 'react';

const Blog = ({ blog, remove, isOwner, like }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showDetails, setShowDetails] = useState(false);


    return (
        <div
            style={{ border: '2px solid black', padding: 5, background: isHovered ? 'grey' : '' }}
            // onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <h4>{blog.title} | {blog.author}</h4>
            {showDetails && <div style={{ marginBottom: 15 }}>
                <a href={blog.url}>{blog.url}</a>
                <div>
                    likes {blog.likes}
                    <button onClick={like} aria-label='like-btn' >like</button>
                </div>
                {isOwner && <button onClick={remove}>remove</button>}
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