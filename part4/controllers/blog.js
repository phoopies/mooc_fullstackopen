const router = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
require('express-async-errors');

router.post('/', async (req, res, _next) => {
    const body = req.body;

    // Would use mongoose internal validation but it returns a status code 500.
    if (!(body.title && body.url)) {
        res.status(400).json({ 'error': 'Missing fields' });
    }

    // TODO userId from request
    const user = await User.findOne({});
    const blog = new Blog({ ...req.body, user: user.id });

    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog.id);
    await user.save();
    res.status(201).json(savedBlog);
});

router.get('/', async (_req, res) => {
    const blog = await(Blog.find({})).populate('user', { userName: 1, name: 1 });

    if (blog) {
        res.json(blog);
    } else {
        res.status(404).end();
    }
});

router.delete('/:id', async (req, res, _next) => {
    await Blog.findByIdAndRemove(req.params.id);
    res.status(204).end();
});


router.put('/:id', async (req, res, _next) => {
    const body = req.body;

    // Can only edit likes.
    const blog = {
        likes: body.likes
    };

    const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        blog,
        { new: true, runValidators: false, context: 'query' }
    );

    res.json(updatedBlog);
});

module.exports = router;