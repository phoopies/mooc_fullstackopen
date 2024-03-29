const express = require('express');
const blogRouter = require('./controllers/blog');
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');
const usersRouter = require('./controllers/user');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');

const app = express();
app.use(middleware.tokenExtractor);

const disconnect = () => {
    logger.info('Disconnecting...');
    mongoose.connection.disconnect();
};

logger.info('Connecting to database...');

mongoose.connect(config.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((_result) => logger.info('Connected to database'))
    .catch((error) => logger.error('Failed to connect\n', error));


// app.use(express.static('build'));
app.use(express.json());

app.use('/api/blogs', blogRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing');
    app.use('/api/testing', testingRouter);
}

app.on('close', () => {
    disconnect();
});

// app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
