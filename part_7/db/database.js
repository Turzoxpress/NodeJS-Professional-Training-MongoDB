var mongoose = require("mongoose");

// Try with 127.0.0.1 if localhost do not work
mongoose.connect("mongodb://127.0.0.1:27017/mongodb_demo_database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var conn = mongoose.connection;

conn.on("connected", function () {
  console.log("database is connected successfully");
});
conn.on("disconnected", function () {
  console.log("database is disconnected successfully");
});

conn.on("error", console.error.bind(console, "connection error:"));

module.exports = conn;
