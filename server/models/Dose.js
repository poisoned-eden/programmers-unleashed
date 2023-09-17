const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const doseSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  medId: {
    type: Schema.Types.ObjectId,
    ref: "Med",
  },
  doseDate: {
    type: String,
  },
  doseTime: {
    type: String,
  },
  doseLogged: {
    type: String,
  },
});

const Dose = model("Dose", doseSchema);

module.exports = Dose;
