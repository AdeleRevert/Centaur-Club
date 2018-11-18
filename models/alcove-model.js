const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const alcoveSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    owner: { type: Schema.Types.ObjectId },
    pictureUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const Alcove = mongoose.model("Alcove", alcoveSchema);

module.exports = Alcove;
