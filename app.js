const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes');


const app = express();
const port = process.env.Port || 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to the database
mongoose.connect('mongodb://shadi:shadi@ds131800.mlab.com:31800/animalsquiz');

const cors = require('cors');

//app.use(cors());

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
  
app.use(router);

app.get('/', (req, res) => {
    res.send('Welcome to Animals quiz server ');
});

app.listen(port, () => {
    console.log(`Listening on port  ${chalk.green(port)}`);
});