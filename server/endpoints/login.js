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
    let password = body.password;
    let user = await getDb("users").findOne({ email: email });
    if (!user) {
      res.send(
        JSON.stringify({
          success: false,
          msg: "Login-Error, Username not found!",
        })
      );
      return;
    }
    if (!(user.password === sha1(password))) {
      res.send(
        JSON.stringify({
          success: false,
          msg: "Login-Error, Incorrect Password!",
        })
      );
      return;
    }
    let sessionId = "" + user._id;

    await getDb("sessions").insertOne({
      sid: sessionId,
      email: user.email,
      name: user.name,
    });

    res.cookie("sid", sessionId);
    res.send(
      JSON.stringify({
        success: true,
        msg: "Login Successful!",
        name: user.name,
        email: user.email,
        id: user._id,
      })
    );
  } catch (err) {
    res.send(JSON.stringify({ success: false, msg: err }));
  }
});
module.exports = router;
