const logger = require('./logger');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const errorHandler = (error, _request, response, next) => {
    logger.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformed id' });
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
            error: 'invalid token'
        });
    }

    next(error);
};

const tokenExtractor = (req, _res, next) => {
    const auth = req.get('authorization');
    req.token = auth && auth.toLowerCase().startsWith('bearer ') ? auth.substring(7) : null;
    next();
};

const userExtractor = async (req, res, next) => {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!req.token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);
    req.user = user;
    next();
};

module.exports = {
    errorHandler,
    tokenExtractor,
    userExtractor
};