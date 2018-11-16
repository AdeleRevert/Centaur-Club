const express      = require('express');
const router       = express.Router();
const Alcove       = require ("./models/alcove-model.js");
const Message      = require ("./models/message-model.js");
const User         = require ("./models/user-model.js");


//SET ROUTES
// /
router.get('/', (req, res, next) => {
  if(req.user){
    console.log("LOGGED IN", req.user) 
  }
  else{console.log("NOT LOGGED IN!", req.user)}
  res.render('index');
});


module.exports = router;
