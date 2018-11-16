//REQUIRE PACKAGES
const express        = require("express");
const passportRouter = express.Router();
const passport       = require("passport");
const bcrypt         = require("bcrypt");
const ensureLogin    = require("connect-ensure-login");
const User           = require ("../models/user.js");

//DEFINE ROUTES
//private 
passportRouter.get("/", (req, res, next) => {
  res.render("/", {);
});

//signup
passportRouter.get("/signup", (req, res, next)=>{
  res.render("passport/signup.hbs")
})

//sign-up post
passportRouter.post("/signup-process", (req, res, next)=>{
  const {username, originalPassword} = req.body; 
  const password = bcrypt.hashSync(originalPassword, 10);
  User.create({username, password})
  .then(userDoc=>{
     res.redirect("/");
  })
  .catch(err=> next(err));

})

//login
passportRouter.get("/login", (req, res, next)=>{
  res.render("passport/login.hbs")
})

//login post
passportRouter.post("/login-process", (req, res, next)=>{
  const {username, originalPassword} = req.body;
   User.findOne({username:{$eq: username}}) 
   .then(userDoc=>{ 
     if(!userDoc){ 
       res.redirect("/")
       return;
     }
     const encryptedPassword = userDoc.password; 
     if(!bcrypt.compareSync(originalPassword, encryptedPassword)){
      res.redirect("/")
      return;
   }
   else{
   req.logIn(userDoc, ()=>{ 
    res.redirect("/private-page")})
}
  })
  .catch(err => next(err))
});



module.exports = passportRouter;