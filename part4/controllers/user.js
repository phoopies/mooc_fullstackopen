const bcrypt = require('bcryptjs');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (req, res) => {
    const { username, name, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({
            error: 'username must be unique'
        });
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        username,
        name,
        passwordHash,
    });

    const savedUser = await user.save();

    res.status(201).json(savedUser);
});

usersRouter.get('/', async (_req, res) => {
    const user = await(User.find({}));

    if (user) {
        res.json(user);
    } else {
        res.status(404).end();
    }
});

module.exports = usersRouter;