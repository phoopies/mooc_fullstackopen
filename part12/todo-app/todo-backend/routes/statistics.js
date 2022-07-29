const express = require('express');
const { getAsync } = require('../redis');
const router = express.Router();

router.get('/', async (req, res) => {
    const addedTodos = await getAsync('added_todos');
    res.send({'added_todos': addedTodos ? Number(addedTodos) : 0})
})

module.exports = router;