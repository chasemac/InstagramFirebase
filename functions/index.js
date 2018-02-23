const functions = require('firebase-functions');
var admin = require("firebase-admin");
var serviceAccount = require("./key/instagramfirebase-ede01-firebase-adminsdk-fx1d3-6d4f065e0f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://instagramfirebase-ede01.firebaseio.com/"
});

exports.sendPushNotifications = functions.https.onRequest((req, res) => {
  res.send("Attempting to send PUSH notification...")
  console.log("LOGGER: --- Trying to send PUSH message....");

  // As an admin, the app has access to read and write all data, regardless of Security Rules
  var uid = 'uedniWFX3QgBZrjfWygsnwjxMxY2';
  var db = admin.database();
  var ref = db.ref("/users/" + uid);
  return ref.once("value", function(snapshot) {
    var user = snapshot.val();
    console.log("user name: " + user.username + " fcmToken: " + user.fcmToken);

  })

//   //admin.message().sendToDevice(token, payload)
//   // This registration token comes from the client FCM SDKs.
//   var fcmToken = 'ddQrANcEXiU:APA91bEacgimEZyf_-fOW3YaBd8QKzvaB_2iQqnDy7mBLLW3mWBeDntMx7C5JTLS2pYykmA1sRQWhD0Eq39ZPpwHTTr7I038qJDdKnrtFyOieweZP0OzEUbao5x-mR-qRvgeeacAc3iq';
//
//   // See documentation on defining a message payload.
//   var payload = {
//     notification: {
//       title: "TITLE OF notification",
//       body: "BODY OF MESSAGE"
//     },
//     data: {
//       score: '850',
//       time: '2:45'
//     },
//   };
//
//   // Set the message as high priority and have it expire after 24 hours.
// var options = {
//   priority: "high",
//   timeToLive: 60 * 60 * 24
// };
//
//   // Send a message to the device corresponding to the provided
//   // registration token.
//   admin.messaging().sendToDevice(fcmToken, payload, options)
//   .then((response) => {
//       // Response is a message ID string.
//       console.log('Successfully sent message:', response);
//       return true
//     }).catch((error) => {
//       console.log('Error sending message:', error);
//       return true
//     });

})






// exports.sendPushNotifications = functions.https.onRequest((req, res) => {
//   res.send("Attempting to send push notification....")
//   console.log("LOGGER ___ Trying to send push message...")
//
//   var uid =
//   var fcmToken= "ddQrANcEXiU:APA91bEacgimEZyf_-fOW3YaBd8QKzvaB_2iQqnDy7mBLLW3mWBeDntMx7C5JTLS2pYykmA1sRQWhD0Eq39ZPpwHTTr7I038qJDdKnrtFyOieweZP0OzEUbao5x-mR-qRvgeeacAc3iq";
//   var payload = {
//     notification: {
//       title: "push",
//       body: "Push it"
//     },
//     data: {
//       score: "850",
//       time: "2:45"
//     }
//   };
// })
