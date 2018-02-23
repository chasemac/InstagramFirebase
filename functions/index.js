const functions = require('firebase-functions');
var admin = require("firebase-admin");
var serviceAccount = require("./key/instagramfirebase-ede01-firebase-adminsdk-fx1d3-6d4f065e0f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://instagramfirebase-ede01.firebaseio.com/"
});

// listen for following events and then trigger a push notification
exports.observeFollowing = functions.database.ref('/following/{uid}/{followingId}').onCreate(event => {

  var uid = event.params.uid;
  var followingId = event.params.followingId;

  // let's log out some messages
  console.log('User: ' + uid + ' is following: ' + followingId)

  //trying to figure out fcmToken to send a push message
  var db = admin.database();
  var ref = db.ref("/users/" + followingId);
  return ref.once("value", snapshot => {

    var userWeAreFollowing = snapshot.val();

    var refUserName = db.ref("/users/" + uid);
    return refUserName.once('value', snapshot => {

      var userDoingTheFollowing = snapshot.val();

      var payload = {
        notification: {
          title: "You now have a new follower",
          body: userDoingTheFollowing.username + " is now following you"
        },
        data: {
          followerId: uid
        }
      };

      admin.messaging().sendToDevice(userWeAreFollowing.fcmToken, payload)
        .then((response) => {
          console.log('Successfully sent message:', response);
          return true
        }).catch((error) => {
          console.log('Error sending message:', error);
          return true
        });

    })

  })
})


// exports.sendPushNotifications = functions.https.onRequest((req, res) => {
//   res.send("Attempting to send PUSH notification...")
//   console.log("LOGGER: --- Trying to send PUSH message....");
//
//   // As an admin, the app has access to read and write all data, regardless of Security Rules
//   var uid = 'uedniWFX3QgBZrjfWygsnwjxMxY2';
//   var db = admin.database();
//   var ref = db.ref("/users/" + uid);
//   return ref.once("value", function(snapshot) {
//     var user = snapshot.val();
//     console.log("user name: " + user.username + " fcmToken: " + user.fcmToken);
//     // See documentation on defining a message payload.
//     var payload = {
//       notification: {
//         title: "TITLE OF notification",
//         body: "BODY OF MESSAGE"
//       },
//     };
//     // Send a message to the device corresponding to the provided
//     // registration token.
//     admin.messaging().sendToDevice(user.fcmToken, payload)
//       .then((response) => {
//         // Response is a message ID string.
//         console.log('Successfully sent message:', response);
//         return true
//       }).catch((error) => {
//         console.log('Error sending message:', error);
//         return true
//       });
//   });
// })
