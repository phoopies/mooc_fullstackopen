import blogService from '../services/blogs';
import { createSlice } from '@reduxjs/toolkit';

const blogSlice = createSlice({
    name: 'blog',
    initialState: [],
    reducers: {
        getBlogs(state, _action) {
            return state;
        },
        setBlogs(_state, action) {
            return action.payload;
        },
        addBlog(state, action) {
            state.push(action.payload);
        },
        updateBlog(state, action) {
            const blog = action.payload;
            return state.map(b => (b.id === blog.id ? blog : b));
        },
        deleteBlog(state, action) {
            const blog = action.payload;
            return state.filter(b => b.id !== blog.id);
        },
    },
});

export const createBlog = (blog) => {
    return async (dispatch) => {
        const newBlog = await blogService.create(blog);
        dispatch(addBlog(newBlog));
    };
};

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll();
        dispatch(setBlogs(blogs));
    };
};

export const likeBlog = (blog) => {
    return async (dispatch) => {
        const updatedBlog = await blogService.update({
            ...blog,
            likes: blog.likes + 1,
        });
        dispatch(updateBlog(updatedBlog));
    };
};

export const removeBlog = (blog) => {
    return async (dispatch) => {
        const res = await blogService.remove(blog);
        if (res.status !== 204) {
            console.log(`Failed to delete ${blog}`);
        }
        dispatch(deleteBlog(blog));
    };
};

export const { getBlogs, addBlog, setBlogs, updateBlog, deleteBlog } =
    blogSlice.actions;
export default blogSlice.reducer;
