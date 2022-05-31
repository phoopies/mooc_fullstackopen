const mongoose = require('mongoose');
const supertest = require('supertest');
const Blog = require('../models/blog');
const helper = require('./helper');
const app = require('../app');

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.blogs);
});

test('has correct amount of blogs', async () => {
    const res = await api.get('/api/blogs');
    expect(res.body).toHaveLength(helper.blogs.length);
});

test('Blog identifier is "id"', async () => {
    const res = await api.get('/api/blogs');
    const blog = res.body[0];
    expect(blog.id).toBeDefined();
});

test('A valid blog can be added', async () => {
    const title = 'Testing patterns';
    const blog = {
        title: title,
        author: 'Mooc',
        url: 'https://youwish.u/',
        likes: 100
    };

    await api
        .post('/api/blogs')
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.blogs.length + 1);

    expect(blogsAtEnd.map(b => b.title)).toContain(title);
});

test('Default likes is set to 0', async () => {
    const blog = {
        title: 'No likes',
        author: 'The hated one',
        url: 'www.com'
    };

    await api
        .post('/api/blogs')
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

    const blogs = await helper.blogsInDb();
    const addedBlog = blogs.find(b => b.title === 'No likes');
    expect(addedBlog.likes).toEqual(0);
});

describe('Adding invalid blogs', () => {
    test('Missing title', async () => {
        const blog = {
            author: 'Missing info',
            url: 'some url'
        };

        await api
            .post('/api/blogs')
            .send(blog)
            .expect(400);
    });

    test('Missing url', async () => {
        const blog = {
            author: 'Missing info',
            title: 'some title'
        };

        await api
            .post('/api/blogs')
            .send(blog)
            .expect(400);
    });

    test('Missing title and url', async () => {
        const blog = {
            author: 'Missing info',
        };

        await api
            .post('/api/blogs')
            .send(blog)
            .expect(400);
    });

});



afterAll(() => {
    mongoose.connection.close();
});