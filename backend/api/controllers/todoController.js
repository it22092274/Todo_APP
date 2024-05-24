const Todo = require('../models/Todo_model.js');

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const addTodo = async (req, res) => {
  const { text } = req.body;
  try {
    const newTodo = new Todo({
      text,
    });
    const todo = await newTodo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getTodos,
  addTodo,
};
