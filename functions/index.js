exports.sendPushNotifications = functions.https.onRequest((req, res) => {
  res.send("Attempting to send push notification....")
  console.log("LOGGER ___ Trying to send push message...")
  var fcmToken= "ddQrANcEXiU:APA91bEacgimEZyf_-fOW3YaBd8QKzvaB_2iQqnDy7mBLLW3mWBeDntMx7C5JTLS2pYykmA1sRQWhD0Eq39ZPpwHTTr7I038qJDdKnrtFyOieweZP0OzEUbao5x-mR-qRvgeeacAc3iq";
  var payload = {
    notification: {
      title: "push",
      body: "Push it"
    },
    data: {
      score: "850",
      time: "2:45"
    }
  };
})
