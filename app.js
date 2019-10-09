const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRouter');
const todoRouter = require('./routes/todoRouter');
const { connectDB } = require('./config');
const { validateUser } = require('./middlewares/validateRequest');

//connect to database
connectDB();

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());


app.use(express.static(__dirname + '/public'));

app.all('/*', function (req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});
//public routes
app.use('/auth', userRouter);
//private routes
app.use('/api/v1', validateUser, todoRouter);

app.get('/favicon.ico', function (req, res) {
    res.sendStatus(204);
});

// If no route is matched by now, it must be a 404
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500).json({
        message: err.message
    });
});


module.exports = app;
