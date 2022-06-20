import { useEffect } from 'react';
import Notification from './components/Notification';
import { useDispatch, useSelector } from 'react-redux';
import BlogView from './components/BlogView';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUser } from './reducers/loginReducer';
import NavBar from './components/NavBar';
import Users from './components/Users';
import NotFound from './components/NotFound';
import { Route, Routes, useMatch } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { initializeusers } from './reducers/userReducer';
import UserView from './components/UserView';
import BlogsView from './components/BlogsView';

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initializeBlogs());
        dispatch(initializeUser());
        dispatch(initializeusers());
    }, [dispatch]);

    const users = useSelector((state) => state.users);
    const blogs = useSelector((state) => state.blogs);

    const userMatch = useMatch('/users/:id');
    const viewUser = userMatch
        ? users.find(u => u.id === userMatch.params.id)
        : null;

    const blogMatch = useMatch('/blogs/:id');
    const viewBlog = blogMatch
        ? blogs.find(b => b.id === blogMatch.params.id)
        : null;


    return (
        <Box>
            <NavBar />
            <Container>
                <Notification />
                <Routes>
                    <Route path="/" element={<BlogsView />} />
                    <Route path="/users" element={<Users />} />
                    <Route
                        path="/users/:id"
                        element={<UserView user={viewUser} />}
                    />
                    <Route
                        path="/blogs/:id"
                        element={<BlogView blog={viewBlog} />}
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Container>
        </Box>
    );
};

export default App;
