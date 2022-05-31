const router = require('express').Router();
const Blog = require('../models/blog');
require('express-async-errors');

router.post('/', async (req, res, _next) => {
    const body = req.body;

    // Would use mongoose internal validation but it returns a status code 500.
    if (!(body.title && body.url)) {
        res.status(400).json({ 'error': 'Missing fields' });
    }
    const blog = new Blog(req.body);

    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
});

router.get('/', async (_req, res) => {
    const blog = await(Blog.find({}));

    if (blog) {
        res.json(blog);
    } else {
        res.status(404).end();
    }
});

module.exports = router;