import { useState } from 'react';
import { likeBlog, removeBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import { useDispatch } from 'react-redux';

const Blog = ({ blog }) => {
    const dispatch = useDispatch();

    const like = () => {
        dispatch(likeBlog(blog));
        dispatch(setNotification(`You liked ${blog.title}`, 'green', 5));
    };

    const remove =  () => {
        const really = confirm(`Remove blog ${blog.title}?`);
        if (!really) return;
        dispatch(removeBlog(blog)); // TODO handle errors
        dispatch(setNotification(`Removed ${blog.title}`), 'yellow', 3);
    };

    const [showDetails, setShowDetails] = useState(false);

    return (
        <div style={{ border: '2px solid black', padding: 5 }} className="blog">
            <h4>
                {blog.title} | {blog.author}
            </h4>
            {showDetails && (
                <div style={{ marginBottom: 15 }}>
                    <a href={blog.url}>{blog.url}</a>
                    <div>
                        likes {blog.likes}
                        <button onClick={like} className="like-btn">
                            like
                        </button>
                    </div>
                    <button onClick={remove}>remove</button>
                </div>
            )}
            <button
                onClick={() => {
                    setShowDetails(!showDetails);
                }}
            >
                {showDetails ? 'close' : 'view'}
            </button>
        </div>
    );
};

export default Blog;
