const lodash = require("lodash");

const dummy = blogs => {
    return 1;
};

const totalLikes = (blogs) => {
    return blogs.reduce((prev, blog) => prev + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
    return blogs.reduce((prev, blog) => blog.likes > (prev ? prev.likes : 0) ? blog : prev, undefined);
};

const mostBlogs = (blogs) => {
    return lodash.chain(blogs).groupBy('author').map((val, key) => ({'author': key, 'blogs': val.length})).maxBy('blogs').value();
};

const mostLikes = (blogs) => {
    return lodash.chain(blogs).groupBy('author').map((val, key) => ({'author': key, 'likes': lodash.reduce(val, (prev, blog) => prev + blog.likes, 0)})).maxBy('likes').value();
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
};

