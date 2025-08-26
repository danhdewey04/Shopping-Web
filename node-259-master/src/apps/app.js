require("../../config/passport");
const passport = require("passport");//new
const express = require("express");
const session = require("express-session");
const config = require("config");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');//new
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/static", express.static(config.get("staticFolder")));
app.set("views", config.get("viewsFolder"));
app.set("view engine", config.get("viewEngine"));
app.use(cookieParser());//new

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "vietpro_key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Khởi tạo passport
app.use(passport.initialize());
app.use(passport.session());

app.use(require(config.get("router")));
module.exports = app;
