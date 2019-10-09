var express = require('express');
var router = express.Router();



var todos = require('../controllers/todo');
const { check } = require('express-validator');
/*
 * Routes that can be accessed by any one
 */
const validations =[
    check('item','Please enter an item').isLength({max:255})
    .not()
    .isEmpty()
    .isString()
];

router.get('/task', todos.getAll);
router.get('/task/:id',todos.getTodosById);
router.post('/task/create',validations, todos.create);
router.put('/task/update/:id',validations,todos.update);
router.delete('/task/destroy/:id', todos.delete);

module.exports = router;
