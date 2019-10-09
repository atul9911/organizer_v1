const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const { check } = require('express-validator');
const {validateUser} = require('../middlewares/validateRequest');

router.post('/register',[
check('name','Name is required')
.not()
.isEmpty(),
check('email','Please enter valid email').isEmail(),
check('password','Please enter a password with 4 or more characters').isLength({min:4})
], userController.create);
router.post('/authenticate',[
    check('email','Please enter valid email').isEmail(),
    check('password','Please enter a password with 4 or more characters').isLength({min:4}),
], userController.authenticate);
router.put('/users',validateUser,userController.update);
router.delete('/users',validateUser,userController.delete);


module.exports = router;