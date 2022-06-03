import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm';
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, []);

  useEffect(() => {
    const savedUser = loginService.getUser();
    if (!savedUser) return;
    setUser(savedUser);
    blogService.setToken(savedUser.token);
  }, []);

  const logout = () => {
    loginService.logout();
    setUser(undefined);
  };

  return (
    <div>
      {user ?
        <div>
          <p>{user.name} logged in</p>
          <button onClick={logout}>logout</button>
          <BlogForm setBlogs={setBlogs}/>
        </div> :
        <Login setUser={setUser} />
      }

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
