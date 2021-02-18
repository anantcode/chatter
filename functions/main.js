const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
const functions = require('firebase-functions');

var serviceAccount = require("functions/service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fireship-lessons.firebaseio.com"
});

