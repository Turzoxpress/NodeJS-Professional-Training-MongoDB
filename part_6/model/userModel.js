var mongoose = require("mongoose");
var db = require("../db/database");

// create an schema
var userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: String,
  address: String,

  created_at : String,
  modified_at : String
});

userTable = mongoose.model("usersCollection", userSchema, "usersCollection");

module.exports = userTable;
