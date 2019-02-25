'use strict';

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser')

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

const APP_NAME = 'Test app';

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
})).use(bodyParser.json());

app.post('/contact', (req, res) => {
  sendContactEmail(req.body).then(() => {
    res.status(200).send(true);
    return;
  }).catch(() => {
    res.status(500).send("Email send failed");
  });
});

app.get('*', (req, res) => {
  res.send('what???', 404);
});

exports.api = functions.https.onRequest(app);

function sendContactEmail(body) {
  const mailOptions = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: 'erno_08@yahoo.com',
  }

  // The user sent a contact message
  mailOptions.subject = 'contact form message';
  mailOptions.html = `<p><b>Name: </b>${body.name}</p>
                      <p><b>Email: </b>${body.email}</p>
                      <p><b>Message: </b>${body.message}</p>`;

  return mailTransport.sendMail(mailOptions);
}
