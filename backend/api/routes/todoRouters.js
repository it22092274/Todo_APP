const express = require('express');
const { getTodos, addTodo } = require('../controllers/todoController.js');
const router = express.Router();

router.get('/', getTodos);
router.post('/', addTodo);

module.exports = router;
