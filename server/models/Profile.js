const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const foodSchema = require("./Food");
const { Profile } = require("../models/Profile");
const { AuthenticationError } = require("apollo-server-express");

const profileSchema = new Schema(
  {
    name: {
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
    age: {
      type: Number,
      trim: true,
    },
    savedFoods: [foodSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

profileSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

profileSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

profileSchema.virtual("totalCalories").get(function () {
  let totalCalories = 0;
  for (let i = 0; i < this.savedFoods.length; i++) {
    totalCalories += this.savedFoods[i].calories;
  }
  return totalCalories;
});

const Profile = model("Profile", profileSchema);

module.exports = Profile;
