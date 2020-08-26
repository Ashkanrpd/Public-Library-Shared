require("dotenv").config();
let express = require("express");
let app = express();
let cookieParser = require("cookie-parser");
let dbo = undefined;
let initMongo = require("./server/database/database.js").initMongo;
let url = process.env.SERVER_PATH;

app.use(cookieParser());
app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/", express.static("./public")); // Needed for local assets
app.use("/uploads", express.static("uploads"));

// Your endpoints go after this line

// Signup
const signup = require("./server/endpoints/signup.js");
app.use("/signup", signup);

// Login
const login = require("./server/endpoints/login.js");
app.use("/login", login);

//Active Session
const sessions = require("./server/endpoints/sessions.js");
app.use("/sessions", sessions);

//Logout
const logout = require("./server/endpoints/logout.js");
app.use("/logout", logout);

// Get Categories
const categories = require("./server/endpoints/categories.js");
app.use("/categories", categories);

// Get all items
const items = require("./server/endpoints/items.js");
app.use("/items", items);

// Get only 1 item
const item = require("./server/endpoints/item.js");
app.use("/item", item);

// Borrow a book
const borrowItem = require("./server/endpoints/borrow.js");
app.use("/borrow", borrowItem);

// Return a book
const returnItem = require("./server/endpoints/return.js");
app.use("/return", returnItem);

// Reserve a book
const reserveItem = require("./server/endpoints/reserve.js");
app.use("/reserve", reserveItem);

// Cancel a reserve
const cancelReserve = require("./server/endpoints/cancelReserve.js");
app.use("/cancelReserve", cancelReserve);

// Profile
const profile = require("./server/endpoints/profile.js");
app.use("/profile", profile);

// Contact us
const contact = require("./server/endpoints/contact.js");
app.use("/contact", contact);

app.all("/*", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});
// Your endpoints go before this line

let listener;
let start = async (database) => {
  await initMongo(url, database).then((response) => {
    dbo = response;
    listener = app.listen(
      process.env.PORT || 4000,
      process.env.LOCAL_ADDRESS || "0.0.0.0",
      () => {
        console.log("Server running");
      }
    );
  });
};
let close = () => {
  listener.close();
};

module.exports = { app, start, close };
