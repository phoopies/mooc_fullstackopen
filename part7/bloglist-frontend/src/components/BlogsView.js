import { useRef } from 'react';
import BlogForm from './BlogForm';
import Hidable from './Hidable';
import { useSelector } from 'react-redux';
import BlogList from './BlogList';

const BlogsView = () => {
    const user = useSelector((state) => state.login);
    const blogFormRef = useRef();

    return (
        <div>
            {user && (
                <div>
                    <Hidable
                        buttonLabel="Add a new blog"
                        id="new-blog-btn"
                        ref={blogFormRef}
                    >
                        <BlogForm />
                    </Hidable>
                </div>
            )}
            <BlogList />
        </div>
    );
};
export default BlogsView;
