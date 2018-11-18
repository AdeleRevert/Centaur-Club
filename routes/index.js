const express      = require('express');
const passportRouter       = express.Router();
const User         = require ("../models/user-model.js");


//SET ROUTES
// / home page
passportRouter.get('/', (req, res, next) => {
  if(req.user){
    console.log("LOGGED IN", req.user) 
  }
  else{console.log("NOT LOGGED IN!", req.user)}
  res.render('index');
});

// UPDATE USER SETTINGS
passportRouter.post("/process-settings", (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { $set: { name, email }},
    { runValidators: true },
  )
  .then(userDoc => {
    req.flash("success", "Settings saved");
    res.redirect("/private-page");
  })
  .catch(err => next(err));
})

module.exports = passportRouter;
