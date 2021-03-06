const express = require("express");
const router = express.Router();
const getDb = require("../database/database.js").getDb;

router.get("/", async (req, res) => {
  try {
    const items = await getDb("books").find({}).toArray();
    res.send(JSON.stringify({ success: true, items: items }));
  } catch (err) {
    res.send(JSON.stringify({ success: false, msg: err }));
  }
});

module.exports = router;
