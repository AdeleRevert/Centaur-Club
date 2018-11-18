const express = require("express");

const Alcove = require("../models/alcove-model.js");

const passportRouter = express.Router();

// ADD AN ALCOVE
passportRouter.get("/alcove/add", (req, res, next) => {
  if(!req.user){
    req.flash("error", "You have to be logged-on to add a room");
    res.redirect("/login");
  }
  else {
    res.render("alcove-views/alcove-form.hbs");
  }
})

passportRouter.post("/process-alcove", (req, res, next) => {
  const { name, description, pictureUrl } = req.body;
  const { owner } = req.body;

  Alcove.create({ name, description, pictureUrl, owner })
  .then(alcoveDoc => {
    req.flash("success", "Alcove created succesfully");
    res.redirect("/private-page.hbs");
  })
  .catch(err => next(err));
})

// ACCES YOUR ALCOVES ON YOUR PRIVATE PAGE
passportRouter.get("/private-page", (req, res, next) => {
  Alcove.find({ owner: $eq req.user._id })
  .sort({createdAt: -1 })
  .then(alcoveResults => {
    res.locals.alcoveArray = alcoveResults;
    res.render("/private-page.hbs");
  })
  .catch(err => next(err));
})

module.exports = passportRouter;