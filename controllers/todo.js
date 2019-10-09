const Todo = require('../models/Todo');
const { MyError } = require('../config/myError');
const { validationResult } = require('express-validator');

var todosApi = {

    getAll: async (req, res, next) => {
        console.log("authenticated so got all todos");
        try {
            const data = await Todo.find({ user: req.body.userId }).sort({ date: -1 });
            return res.status(200).json(data);
        } catch (err) {
            return next(new MyError("Error in finding todos", 500));
        }
    },
    getTodosById: async (req, res) => {
        try {
            const todo = await Todo.findById({ _id: req.params.id });
            return res.status(200).json(todo);
        } catch (err) {
            return next(new MyError("todo not found", 500));
        }
    },
    create: async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const { item, userId } = req.body;
        const todo = new Todo({
            item,
            user: userId
        })
        try {
            await todo.save();
            return res.status(201).json(todo);
        } catch (err) {
            return next(new MyError("Error in creation of data", 500));
        }
    },
    update: async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const { item } = req.body;
        try {
            const updatedata = await Todo.update({ "_id": req.params.id }, { $set: { item } });
            return res.status(200).json(updatedata);
        } catch (err) {
            return next(new MyError("Error in updating", 500));
        }
    },

    delete: async (req, res, next) => {
        try {
            const obj = await Todo.remove({ "_id": req.params.id });
            return res.status(204).json(obj);
        } catch (err) {
            return next(new MyError("error in deleting data", 500));
        }
    }
};

module.exports = todosApi;
