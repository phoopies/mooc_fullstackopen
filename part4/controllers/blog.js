const router = require('express').Router();
const Blog = require('../models/blog');

router.post('/', (req, res, _next) => {
    const blog = new Blog(req.body)

    blog
      .save()
      .then(result => {
        res.status(201).json(result)
      })
});

router.get('/', (_req, res) => {
    Blog
    .find({})
    .then(blogs => {
      res.json(blogs)
    })
});

module.exports = router;