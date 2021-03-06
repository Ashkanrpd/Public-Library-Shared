const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: __dirname + "/uploads/" });
const sha1 = require("sha1");
const getDb = require("../database/database.js").getDb;

router.post("/", upload.none(), async (req, res) => {
  try {
    let body = JSON.parse(req.body.user);
    let email = body.email;
    let name = body.name;
    let password = body.password;
    let image = body.image;
    let user = await getDb("users").findOne({ email: email });
    if (user) {
      res.send(
        JSON.stringify({ success: false, msg: "Username is already taken!" })
      );
      return;
    }
    let sessionId;
    await getDb("users")
      .insertOne({
        email: email,
        name: name,
        password: sha1(password),
        img: image,
        itemsHistory: [],
        itemsToReturn: [],
        reservedItems: [],
      })
      .then((result) => (sessionId = "" + result.insertedId));

    await getDb("sessions").insertOne({
      sid: sessionId,
      email: email,
      name: name,
    });

    res.cookie("sid", sessionId);
    res.send(
      JSON.stringify({
        success: true,
        msg: "Login Successful!",
        name: name,
        email: email,
        id: sessionId,
      })
    );
  } catch (err) {
    res.send(JSON.stringify({ success: false, msg: err }));
  }
});
module.exports = router;
