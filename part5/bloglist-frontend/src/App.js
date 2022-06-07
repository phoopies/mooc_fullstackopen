import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Login from './components/Login';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(undefined);

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
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
                    <BlogForm setBlogs={setBlogs} addNotification={addNotification}/>
                </div> :
                <Login setUser={setUser} addNotification={addNotification} />
            }

            <h2>blogs</h2>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    );
};

export default App;
