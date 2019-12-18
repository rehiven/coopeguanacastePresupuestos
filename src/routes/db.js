const admin = require("firebase-admin");
var serviceAccount = require("../../node-proyect-coopeg-firebase-adminsdk-ohxk4-1fe7cdd010.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://node-proyect-coopeg.firebaseio.com/"
});

const db = admin.database();


module.exports = db;