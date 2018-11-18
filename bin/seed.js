const mongoose = require("mongoose");

const Alcove = require("../models/alcove-model.js");
const Message = require("../models/message-model.js");
const User = require("../models/user-model.js");


mongoose 
  .connect('mongodb://localhost/Centaur \ Club', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

  const alcoveData = [
    {name: "Sir Winston Churchill", occupation: "UK Prime Minister", catchPhrase: "My most brilliant achievement was my ability to be able to persuade my wife to marry me."},
    {name: "Lord Mountbatten", occupation: "UK Royal Navy Officer", catchPhrase: "The real intelligence in the royal family comes through my parents to Prince Philip and the children."},
    {name: "Benedict Cumberbatch", occupation: "Actor impersonating UK heros", catchPhrase: "Pull the hair on my head the wrong way, and I would be on my knees begging for mercy. I have very sensitive follicles."},
  ];


Alcove.create(alcoveData)
.then(alcoveResult => {
console.log(`${alcove.length} was correctly inserted!`);
})
.catch(err => {
console.log("create Failure!!", err);
});