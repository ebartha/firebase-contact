
const nodemailer = require('nodemailer');
const functions = require('firebase-functions');

const APP_NAME = 'Test app';

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword,
    },
});

exports.sendContactEmail = (req, res) => {
    sendContactEmail(req.body).then(() => {
        res.status(200).send(true);
        return;
    }).catch(() => {
        res.status(500).send("Email send failed");
    });
}

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