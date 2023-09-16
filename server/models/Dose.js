const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const doseSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  medId: {
    type: Schema.Types.ObjectId,
    ref: "Med",
    required: true,
  },
  doseScheduled: {
    type: Date,
    required: true,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  // doseLogged: {
  // 	type: Date,
  //   get: (timestamp) => dateFormat(timestamp),
  // },
});

const Dose = model("Dose", doseSchema);

module.exports = Dose;
