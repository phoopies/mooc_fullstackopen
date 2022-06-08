import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Hidable from './components/Hidable';
import Login from './components/Login';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(undefined);

    const [notifications, setNotifications] = useState([]);
    const blogFormRef = useRef();

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs.sort((a,b) => b.likes - a.likes))
        );
    }, []);

    useEffect(() => {
        const savedUser = loginService.getUser();
        if (!savedUser) return;
        setUser(savedUser);
        blogService.setToken(savedUser.token);
    }, []);

    const logout = () => {
        loginService.logout();
        addNotification(`${user.name} logged out`, 'orange');
        setUser(undefined);
    };

    const addNotification = (message, color) => {
        const notification = { message, color }; // Could add some id for removal
        setNotifications(prev => [...prev, notification]);
        setTimeout(() => setNotifications(prev => prev.filter(n =>
            n !== notification)), 3500);
    };

    const addBlog = (blog) => {
        setBlogs([...blogs, blog]);
        blogFormRef.current.toggleVisibility();
        addNotification(`${blog.title} added by ${blog.author}`, 'green');
    };

    return (
        <div>
            {notifications.map(notification =>
                <Notification
                    key={notification.message}
                    message={notification.message}
                    color={notification.color}
                />
            )}
            {user ?
                <div>
                    <p>{user.name} logged in</p>
                    <button onClick={logout}>logout</button>
                    <Hidable buttonLabel='Add a new blog' ref={blogFormRef}>
                        <BlogForm addBlog={addBlog} />
                    </Hidable>
                </div> :
                <Hidable buttonLabel='Open login'>
                    <Login setUser={setUser} addNotification={addNotification} />
                </Hidable>
            }

            <h2>blogs</h2>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} setBlogs={setBlogs} isOwner={user && blog.user && user.username === blog.user.username /* Username is unique but eh*/} />
            )}
        </div>
    );
};

export default App;
