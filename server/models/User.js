const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const Med = require('./Med');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must match an email address!"],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    savedNotes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Note",
      },
    ],
    userMeds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Med",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual("noteCount").get(function () {
  return this.savedNotes.length;
});

const User = model("User", userSchema);

module.exports = User;
