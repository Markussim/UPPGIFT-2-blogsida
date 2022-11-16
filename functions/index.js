const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.postTwoot = functions.https.onCall((data, context) => {
  // Add twoot to database
  db.collection("twoots").add({
    twoot: data.twoot,
    twootContent: data.twootContent,
  });
});

exports.getTwoots = functions.https.onCall(async (data, context) => {
  // Get twoots from database
  const twoots = await db.collection("twoots").get();
  console.log(twoots);
  return twoots.docs.map((doc) => doc.data());
});
