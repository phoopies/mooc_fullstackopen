import Blog from './Blog';
import { useSelector } from 'react-redux';

const BlogList = () => {
    const blogs = useSelector(state => state.blogs);

    return (
        <div>
            <h2>blogs</h2>
            <div id="blogs">
                {[...blogs].sort((a, b) => b.likes - a.likes).map((blog) => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        // isOwner={
                        //     user &&
                        //     blog.user &&
                        //     (user.id === blog.user.id || user.id === blog.user)
                        // }
                    />
                ))}
            </div>
        </div>
    );
};

export default BlogList;
