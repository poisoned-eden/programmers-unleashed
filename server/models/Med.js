const { Schema, model } = require("mongoose");

const medSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  medName: {
    type: String,
    required: true,
  },
  maxDailyDoses: {
    type: String,
    required: true,
  },
  minTimeBetween: {
    type: String,
    required: true,
  },
  remindersBool: {
    type: String,
    required: true,
  },
  doses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Dose",
    },
  ],

  // TODO add icon
});

const Med = model("Med", medSchema);

module.exports = Med;
