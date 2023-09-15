const { Schema, model } = require("mongoose");

const medSchema = new Schema(
  {
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    medName: {
      type: String,
      unique: true,
      required: true,
    },
    maxDailyDoses: {
      type: Number,
    },
    minTimeBetween: {
      type: Number,
    },
    remindersBool: {
      type: Boolean,
    },
    iconType: {
      type: String,
    },
    doses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Dose",
      },
    ],

    // TODO add icon
  }
);

const Med = model("Med", medSchema);

module.exports = Med;
