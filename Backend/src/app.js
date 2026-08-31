const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

/* Requite all the routes here */
const authRouter = require('./routes/auth.routes');

/* Use all the routes here */
app.use('/api/auth', authRouter);

module.exports = app;