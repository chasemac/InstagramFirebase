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
    // See documentation on defining a message payload.
    var payload = {
      notification: {
        title: "TITLE OF notification",
        body: "BODY OF MESSAGE"
      },
    };
    // Send a message to the device corresponding to the provided
    // registration token.
    admin.messaging().sendToDevice(user.fcmToken, payload)
      .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
        return true
      }).catch((error) => {
        console.log('Error sending message:', error);
        return true
      });
  });
})
