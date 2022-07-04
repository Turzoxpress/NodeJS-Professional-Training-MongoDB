const express = require("express");
const app = express();
app.use(express.json());

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// Simple welcome API
app.get("/welcome", (req, res) => {
  return res.status(200).json({
    status: "success",
    message: "Your backend server is working successfully!",
  });
});

app.post("/profile", upload.single("avatar"), function (req, res) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any

  return res.status(200).json({
    status: "success",
    message: "File uploaded successfully!",
  });
});

app.listen(3000);
