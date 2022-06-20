import {
    Button,
    CircularProgress,
    Link,
    Stack,
    Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { likeBlog, removeBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BlogComments from './BlogComments';

const BlogView = ({ blog }) => {
    const user = useSelector((state) => state.login);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const like = () => {
        dispatch(likeBlog(blog));
        dispatch(setNotification(`You liked ${blog.title}`, 'success', 5));
    };

    const remove = () => {
        const really = confirm(`Remove blog ${blog.title}?`);
        if (!really) return;
        dispatch(removeBlog(blog)); // TODO handle errors
        dispatch(setNotification(`Removed ${blog.title}`, 'success', 3));
        navigate('/');
    };

    console.log(blog);

    const canDelete = () =>
        blog.user &&
        user &&
        (user.id === blog.user || user.id === blog.user.id);

    return blog ? (
        <Stack spacing={2}>
            <Typography variant="h3">
                {blog.title} by {blog.author}
            </Typography>
            <Link href={blog.url}>{blog.url}</Link>
            <Stack direction="row" spacing={2}>
                <Button
                    onClick={like}
                    className="like-btn"
                    variant="contained"
                    startIcon={<ThumbUpIcon />}
                >
                    like
                </Button>
                <Typography variant="p">
                    Currently has {blog.likes} likes
                </Typography>
            </Stack>
            <BlogComments comments={blog.comments} />
            {canDelete() && (
                <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={remove}
                >
                    delete
                </Button>
            )}
        </Stack>
    ) : (
        <CircularProgress />
    );
};

export default BlogView;
