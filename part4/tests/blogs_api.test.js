const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');
const helper = require('./helper');

beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.blogs);
});

describe('Initialization', () => {
    test('has correct amount of blogs', async () => {
        const res = await api.get('/api/blogs');
        expect(res.body).toHaveLength(helper.blogs.length);
    });
});

describe('Misc', () => {
    test('Blog identifier is "id"', async () => {
        const res = await api.get('/api/blogs');
        const blog = res.body[0];
        expect(blog.id).toBeDefined();
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
});

describe('Adding', () => {
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

describe('Deletion', () => {
    test('a note can be deleted', async () => {
        const oldBlogs = await helper.blogsInDb();
        const blog = oldBlogs[0];

        await api
            .delete(`/api/blogs/${blog.id}`)
            .expect(204);

        const blogs = await helper.blogsInDb();

        expect(blogs).toHaveLength(
            oldBlogs.length - 1
        );

        expect(blogs.map(b => b.id)).not.toContain(blog.id);
    });
});

describe('Updating', () => {
    test('Incrementing likes', async () => {
        const oldBlogs = await helper.blogsInDb();
        const blog = oldBlogs[0];

        await api
            .put(`/api/blogs/${blog.id}`)
            .send({ ...blog, likes: blog.likes + 1 })
            .expect(200);

        const blogs = await helper.blogsInDb();
        const updatedBlog = blogs.find(b => b.id === blog.id);

        expect(updatedBlog.likes).toEqual(blog.likes + 1);
    });

    test('setting likes', async () => {
        const oldBlogs = await helper.blogsInDb();
        const blog = oldBlogs[0];

        const newLikes = 10000;

        await api
            .put(`/api/blogs/${blog.id}`)
            .send({ ...blog, likes: newLikes })
            .expect(200);

        const blogs = await helper.blogsInDb();
        const updatedBlog = blogs.find(b => b.id === blog.id);

        expect(updatedBlog.likes).toEqual(newLikes);
    });
});


afterAll(() => {
    mongoose.connection.close();
});