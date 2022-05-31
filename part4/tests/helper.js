const Blog = require('../models/blog');

const blogs = [
    {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7
    }
];

const blogsInDb = async () => {
    const dbBlogs = await Blog.find({});
    return dbBlogs.map(blog => blog.toJSON());
};

module.exports = {
    blogs,
    blogsInDb,
};