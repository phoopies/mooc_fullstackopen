const logger = require('./logger');

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

module.exports = {
    errorHandler,
    tokenExtractor
};