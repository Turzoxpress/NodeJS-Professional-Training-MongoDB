const express = require("express");
const app = express();

app.use(express.json());

const dbConn = require("./db/database");

const userModel = require("./model/userModel");

// Simple welcome API
app.get("/welcome", (req, res) => {
  return res.status(200).json({
    status: "success",
    message: "Your backend server is working successfully!",
  });
});

//-- User registration API
app.post("/register-user", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const phone = req.body.phone;
  const address = req.body.address;

  created_at = new Date();
  modified_at = new Date();

  const previousUser = await userModel.findOne({ email: email });
  if (previousUser) {
    return res.json({ status: 501, message: "User already registered!" });
  }

  userModel
    .create({
      name: name,
      email: email,
      password: password,
      phone: phone,
      address: address,
      created_at: created_at,
      modified_at: modified_at,
    })
    .then((result) => {
      return res.json({
        status: 200,
        message: "User registered successfully!",
        data: result,
      });
    })
    .catch((err) => {
      return res.json({
        status: 500,
        message: "Error" + err,
      });
    });
});

//-- get user info API
app.get("/get-user-info/:email", (req, res) => {
  const email = req.params.email;

  userModel
    .find({ email: email })
    .then((result) => {
      return res.json({
        status: 200,
        count: result.length,
        data: result,
      });
    })
    .catch((err) => {
      return res.json({
        status: 500,
        message: "Error" + err,
      });
    });
});

//-- User login API
app.post("/login-user", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const previousUser = await userModel.findOne({ email: email });
  if (!previousUser) {
    return res.json({
      status: 404,
      message: "No user found with this credential",
    });
  }

  if (previousUser.email === email && previousUser.password === password) {
    return res.json({
      status: 200,
      message: "Login successfull!",
      data: previousUser,
    });
  } else {
    return res.json({
      status: 502,
      message: "Invalid credential",
    });
  }
});

app.listen(3000);
