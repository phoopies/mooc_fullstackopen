import { useState, useEffect, useRef } from 'react';
import BlogForm from './components/BlogForm';
import Hidable from './components/Hidable';
import Login from './components/Login';
import Notification from './components/Notification';
import { setNotification } from './reducers/notificationReducer';
import { useDispatch } from 'react-redux';
import blogService from './services/blogs';
import loginService from './services/login';
import BlogList from './components/BlogList';
import { initializeBlogs } from './reducers/blogReducer';

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initializeBlogs());
    }, [dispatch]);

    const [user, setUser] = useState(undefined); // TODO part 7.13

    const blogFormRef = useRef();

    useEffect(() => {
        const savedUser = loginService.getUser();
        if (!savedUser) return;
        setUser(savedUser);
        console.log(savedUser);
        blogService.setToken(savedUser.token);
    }, []);

    const logout = () => {
        loginService.logout();
        addNotification(`${user.name} logged out`, 'orange');
        setUser(undefined);
    };

    const addNotification = (message, color) => {
        dispatch(setNotification(message, color, 5));
    };

    // const addBlog = async (title, author, url) => {
    //     const res = await blogService.create(title, author, url);
    //     const blog = res.data;
    //     setBlogs([...blogs, blog]);
    //     blogFormRef.current.toggleVisibility();
    //     addNotification(`${blog.title} added by ${blog.author}`, 'green');
    // };

    return (
        <div>
            <Notification />
            {user ? (
                <div>
                    <p>{user.name} logged in</p>
                    <button onClick={logout}>logout</button>
                    <Hidable
                        buttonLabel="Add a new blog"
                        id="new-blog-btn"
                        ref={blogFormRef}
                    >
                        <BlogForm />
                    </Hidable>
                </div>
            ) : (
                <Hidable buttonLabel="Open login">
                    <Login setUser={setUser} />
                </Hidable>
            )}
            <BlogList />
        </div>
    );
};

export default App;
