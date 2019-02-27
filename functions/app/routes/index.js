
const express = require('express');
const bodyParser = require('body-parser');
const contact = require('../controllers/ContactController');

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
})).use(bodyParser.json());

app.post('/contact', (req, res) => {
    contact.sendContactEmail(req, res);
});

// 404 handler
app.use((req, res) => {
    res.status(404).send('what???');
});

exports.app = app;