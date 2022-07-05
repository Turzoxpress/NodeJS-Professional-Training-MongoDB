const express = require("express");
const app = express();

app.use(express.json());

// Simple welcome API
app.get("/welcome", (req, res) => {
  return res.status(200).json({
    status: "success",
    message: "Your backend server is working successfully!",
  });
});

// Dummy GET API
app.get("/getValuePI", (req, res) => {
  return res.status(200).json({
    status: "success",
    value: 3.1416,
    message: "This GET api will return the value of π",
  });
});

// Dummy POST API - from URL Query Parameter
app.post("/squareQueryParams", (req, res) => {
  const value = req.query.value;
  const square = value * value;
  return res.status(200).json({
    status: "success",
    value: square,
    message:
      "This POST api will return the square of a value - URL Query Parameter",
  });
});

// Dummy POST API - from RAW URL Parameter
app.post("/squareRawURL/:value", (req, res) => {
  const value = req.params.value;
  const square = value * value;
  return res.status(200).json({
    status: "success",
    value: square,
    message:
      "This POST api will return the square of a value - RAW URL Parameter",
  });
});

// Dummy POST API - from JSON body
app.post("/squareJSON", (req, res) => {
  const value = req.body.value;
  const square = value * value;
  return res.status(200).json({
    status: "success",
    value: square,
    message: "This POST api will return the square of a value - JSON body",
  });
});

app.listen(3000);
