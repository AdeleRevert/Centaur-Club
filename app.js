//REQUIRE PACKAGES
require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo")(session);


const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

// SET EXPRESS
const app = express();

//SET PASSPORT
app.use(passport.initialize());
app.use(passport.session());

//SET MONGOOSE
mongoose
  .connect(
    "mongodb://localhost/centaur-club",
    { useNewUrlParser: true }
  )
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

// MIDDLEWARE
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Give Express access to /public

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true
  })
);

// Give Express access to /views
hbs.registerPartials(path.join(__dirname, "views", "partials"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

// DEFAULT TITLE
app.locals.title = "Centaur Club";

// ENABLE FLASH MESSAGES
app.use(flash());
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  res.locals.currentUser = req.user;
  next();
});

// MAKE OUR APP CREATE SESSIONS
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: "UkXp2s5v8y/B?E(G+KbPeShVmYq3t6w9",
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));


// IMPORT ROUTES
//index
const index = require("./routes/index");
app.use("/", index);

//authRouter
const authRouter = require("./routes/auth-router.js");
app.use("/", authRouter);

// alcoveRouter
const alcoveRouter = require("./routes/alcove-router.js");
app.use("/", alcoveRouter);


module.exports = app;
