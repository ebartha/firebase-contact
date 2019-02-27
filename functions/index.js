'use strict';

const functions = require('firebase-functions');
const router = require('./app/routes/index');

exports.api = functions.https.onRequest(router.app);