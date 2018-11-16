const mongoose = require("mongoose");
const Schema = mongoose.Schema
const alcoveSchema = new Schema ({
  name : {type: String, required: true},
  user : {type: String, required},
description: {type: String}
},
{timestamps: true}
);

const Alcove = mongoose.model("Alcove", alcoveSchema);
module.exports = Alcove; 