import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Hidable from './components/Hidable';
import Login from './components/Login';
import Notification from './components/Notification';
import { setNotification } from './reducers/notificationReducer';
import { useDispatch } from 'react-redux';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(undefined);

    const dispatch = useDispatch();

    const blogFormRef = useRef();

    useEffect(() => {
        blogService
            .getAll()
            .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
    }, []);

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

    const addBlog = async (title, author, url) => {
        const res = await blogService.create(title, author, url);
        const blog = res.data;
        setBlogs([...blogs, blog]);
        blogFormRef.current.toggleVisibility();
        addNotification(`${blog.title} added by ${blog.author}`, 'green');
    };

    // Not sure why the assigment says that the whole blog has to be sent to the server
    const like = async (blog) => {
        blog.likes++;
        const updatedBlog = await blogService.update(blog);
        setBlogs(
            (prev) =>
                prev
                    .map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
                    .sort((a, b) => b.likes - a.likes) // Would be enough to move the updated blog
        );
        addNotification(`You liked ${blog.title}`, 'green');
    };

    const remove = async (blog) => {
        const really = confirm(`Remove blog ${blog.title}?`);
        if (!really) return;
        const res = await blogService.remove(blog);
        if (res.status !== 204) {
            console.log(`Failed to delete ${blog}`);
        }
        setBlogs((prev) => prev.filter((b) => b.id !== blog.id));
    };

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
                        <BlogForm addBlog={addBlog} />
                    </Hidable>
                </div>
            ) : (
                <Hidable buttonLabel="Open login">
                    <Login
                        setUser={setUser}
                    />
                </Hidable>
            )}

            <h2>blogs</h2>
            <div id="blogs">
                {blogs.map((blog) => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        like={() => like(blog)}
                        remove={() => remove(blog)}
                        isOwner={
                            user &&
                            blog.user &&
                            (user.id === blog.user.id || user.id === blog.user)
                        }
                    />
                ))}
            </div>
        </div>
    );
};

export default App;
