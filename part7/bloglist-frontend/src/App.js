import { useEffect, useRef } from 'react';
import BlogForm from './components/BlogForm';
import Hidable from './components/Hidable';
import Login from './components/Login';
import Notification from './components/Notification';
import { useDispatch, useSelector } from 'react-redux';
import BlogList from './components/BlogList';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUser } from './reducers/loginReducer';
import CurrentUser from './components/CurrentUser';
import NavBar from './components/NavBar';
import Users from './components/Users';
import NotFound from './components/NotFound';
import { Route, Routes } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { initializeusers } from './reducers/userReducer';

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initializeBlogs());
        dispatch(initializeUser());
        dispatch(initializeusers());
    }, [dispatch]);

    const user = useSelector((state) => state.login);
    const blogFormRef = useRef();

    const Temp = () => (
        <div>
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

    return (
        <Box>
            <NavBar />
            <Container>
                <Notification />
                <Routes>
                    <Route path="/" element={<Temp />}></Route>
                    <Route path="/users" element={<Users />}></Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Container>
        </Box>
    );
};

export default App;
