const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')

const userRoutes = require('./routes/user.routes')


app.use(express.json());
app.use(cookieParser());

app.use('/users/v1', userRoutes);




module.exports = app;