import { useEffect, useRef } from 'react';
import BlogForm from './components/BlogForm';
import Hidable from './components/Hidable';
import Login from './components/Login';
import Notification from './components/Notification';
import { useDispatch, useSelector } from 'react-redux';
import BlogList from './components/BlogList';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUser } from './reducers/userReducer';
import CurrentUser from './components/CurrentUser';

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initializeBlogs());
        dispatch(initializeUser());
    }, [dispatch]);

    const user = useSelector(state => state.user);
    const blogFormRef = useRef();

    return (
        <div>
            <Notification />
            {user ? (
                <div>
                    <CurrentUser />
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
                    <Login />
                </Hidable>
            )}
            <BlogList />
        </div>
    );
};

export default App;
