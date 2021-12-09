const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
  },
  query: {
    type: String,
  },
  multiple_image: {
    type: [],
  },
  role: {
    type: String,
  },
});
const user = mongoose.model("user", userSchema, "user");
module.exports = user;
