//REQUIRE PACKAGES
const express = require("express");
const passportRouter = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const ensureLogin = require("connect-ensure-login");
const User = require("../models/user-model.js");

//DEFINE ROUTES
//private
passportRouter.get("/private-page", (req, res, next) => {
  res.render("auth-views/private-page.hbs");
});

//signup
passportRouter.get("/signup", (req, res, next) => {
  res.render("auth-views/signup-form.hbs");
});

//sign-up post
passportRouter.post("/process-signup", (req, res, next) => {
  const { name, email, originalPassword } = req.body;

  if (!originalPassword === null) {
    req.flash("error", "Password can' be blank");
    res.redirect("/signup");
    return;
  }

  const encryptedPassword = bcrypt.hashSync(originalPassword, 10);

  User.create({ name, email, encryptedPassword })
    .then(userDoc => {
      res.redirect("/");
    })
    .catch(err => next(err));
});

//login
passportRouter.get("/login", (req, res, next) => {
  res.render("auth-views/login.hbs");
});

//login post
passportRouter.post("/process-login", (req, res, next) => {
  const { email, originalPassword } = req.body;

  // search the database for a user with that mail
  User.findOne({ email: { $eq: email } })
    .then(userDoc => {
      if (!userDoc) {
        req.flash("error", "Incorrect email");
        res.redirect("/login");
        return;
      }
      const { encryptedPassword } = userDoc;
      if (!bcrypt.compareSync(originalPassword, encryptedPassword)) {
        req.flash("error", "Incorrect password");
        res.redirect("/login");
      } else {
        req.logIn(userDoc, () => {
          req.flash("success", "Login success");
          res.redirect("/private-page");
        });
      }
    })
    .catch(err => next(err));
});

// Logout
passportRouter.get("/logout", (req, res, next) => {
  req.logOut();
  req.flash("success", "Logged out successfully");
  res.redirect("/");
});

module.exports = passportRouter;
