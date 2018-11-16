//REQUIRE PACKAGES
require('dotenv').config();
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const passport     = require("passport");
const session      = require ("express-session");
const MongoStore   = require ("connect-mongo")(session);
const Alcove       = require ("./models/alcove-model.js");
const Message      = require ("./models/message-model.js");
const User         = require ("./models/user-model.js");
const app_name     = require('./package.json').name;
const debug        = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);


//SET PASSPORT
passport.serializeUser((userDoc, done)=> { 
  done(null, userDoc._id) 
})

passport.deserializeUser((userId, done) =>{ 
console.log("Deserialize (retrieve user info from db)")  
User.findById(userId)
  .then(userDoc =>{
    done(null, userDoc); 
  })
  .catch(err => done(err)); 
  })
  app.use(passport.initialize());
  app.use(passport.session());


//SET MONGOOSE
mongoose
  .connect('mongodb://localhost/centaur-club', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });


// MIDDLEWARE 
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// SET EXPRESS
// Give Express access to /public
const app = express();
app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));

// Give Express access to /views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


// DEFAULT TITLE
app.locals.title = 'Centaur Club';


// IMPORT ROUTES
//index
const index = require('./routes/index');
app.use('/', index);

//authRouter
const authRouter = require("./routes/authRouter");
app.use('/', authRouter);


module.exports = app;
