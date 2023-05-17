const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const foodSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  // saved Variable Food ID-For Back End Hooking.  id from GoogleBooks
  // foodId: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String,
//   },
//   link: {
//     type: String,
//   },
//   foodtype: {
//     type: String,
//     required: true,
 //  },
  calories: {
    type: Number,
    required: true,
  },
});

module.exports = foodSchema;
