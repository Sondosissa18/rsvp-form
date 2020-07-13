const express = require("express");
const { request } = require("express");
const router = express.Router();
const pug = require("pug");
const User = require("./models/User");
var bodyParser = require("body-parser");
const app = express();
app.set("view engine", "pug");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/guest", async (req, res) => {
  const GuestList = await User.find((err, rsvp) => {
    if (err) return console.log(err);
  });
  console.log(GuestList);
  res.render("Guest", {
    attendes: GuestList.filter((rsvp) => rsvp.attending),
    notattending: GuestList.filter((rsvp) => rsvp.attending == false),
  });
});

app.get("/deletelist", async (req, res) => {
  const deletelist = await User.remove();
  res.send("deleteList");
});

app.post("/reply", (req, res) => {
  const body = req.body;
  console.log(req.body);

  if (body === undefined) {
    return res.status(400).json({ error: "content missing" });
  }

  const user = new User({
    username: body.username,
    email: body.email,
    attending: body.attending,
    number: body.number,
  });

  user.save().then((savedNote) => {
    res.render("test");
  }).catch((err) => {
    res.json({err});
  });
});

app.listen(3000, function () {
  console.log("Server Connected");
});
