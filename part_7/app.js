const express = require("express");
const app = express();

app.use(express.json());

const userModel = require("./model/userModel");

const bcrypt = require("bcryptjs");

const utils = require("./utils/utils");

//----------------
const multer = require("multer");

function getSystemTime() {
  return Date.now();
}

//-- Get 10 digit random number
function getRandomNumber() {
  return Math.floor(1000000000 + Math.random() * 900000000);
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads");
  },
  async filename(req, file, cb) {
    const newFilePath =
      getRandomNumber() +
      "_" +
      getRandomNumber() +
      "_" +
      getSystemTime() +
      "_" +
      file.originalname;

    console.log("New Image Path : " + newFilePath);
    cb(null, newFilePath);
  },
});
const uploadWithCustomSettings = multer({ storage });

//-----------

const fileSystem = require("fs");
const path = require("path");

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

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const previousUser = await userModel.findOne({ email: email });
  if (previousUser) {
    return res.json({ status: 501, message: "User already registered!" });
  }

  userModel
    .create({
      name: name,
      email: email,
      password: hash,
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

//-- User login API
app.post("/login-user", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const userResult = await userModel.findOne({ email: email });
  if (!userResult) {
    return res.json({
      status: 404,
      message: "No user found with this credential",
    });
  }

  //-------
  const preHash = userResult.password;
  if (bcrypt.compareSync(password, preHash)) {
    let jsonToken = utils.generateAccessToken(userResult);

    return res.json({
      status: 200,
      message: "Login successful!",
      token: jsonToken,
      data: userResult,
    });
  } else {
    return res.json({ status: 502, message: "Invalid credentials!" });
  }

  //-----------------------
});

//-- get user info API
app.get("/get-user-info/:email", utils.authenticateToken, (req, res) => {
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

//-- Upload user profile image
app.post(
  "/upload-profile-image",
  utils.authenticateToken,
  uploadWithCustomSettings.single("avatar"),
  async (req, res) => {
    const email = req.body.email;
    const profile_image_path = req.file.filename;

    const userResult = await userModel.updateOne({ email: email });
    if (!userResult) {
      return res.json({
        status: 404,
        message: "No user found with this credential",
      });
    }

    //-------
    userModel
      .updateOne(
        { email: email },
        {
          $set: {
            profile_image_path: profile_image_path,
          },
        }
      )
      .then((result) => {
        return res.json({
          status: 200,
          message: "Profile picture uploaded successfully!",
        });
      })
      .catch((err) => {
        return res.json({
          status: 500,
          message: "Error" + err,
        });
      });

    //-----------------------
  }
);

//-- Get user profile image
app.get(
  "/get-profile-image/:email",
  utils.authenticateToken,
  async (req, res) => {
    const email = req.params.email;

    const userResult = await userModel.findOne({ email: email });
    if (!userResult) {
      return res.json({
        status: 404,
        message: "No user found with this credential",
      });
    }

    if (userResult.profile_image_path) {
      const filePath = userResult.profile_image_path;
      // return res.json({ path: filePath });

      var filePathServer = path.join("uploads/", filePath);
      //var finalFile = fileSystem.statSync(filePathServer);

      return res.download(filePathServer);
    } else {
      return res.json({
        status: 404,
        message: "File not found!",
      });
    }
  }
);

app.listen(3000);
