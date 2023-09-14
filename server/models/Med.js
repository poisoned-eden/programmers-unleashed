const { Schema, model } = require("mongoose");

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const medSchema = new Schema(
  {
    medName: {
      type: String,
      required: true,
      unique: true,
    },
    maxDailyDoses: {
      type: Number,
    },
    minTimeBetween: {
      type: Number,
    },
    remindersBool: {
      type: Boolean,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Med = model("Med", medSchema);

module.exports = Med;