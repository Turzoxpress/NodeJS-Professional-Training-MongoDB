const express = require("express");
const app = express();

app.use(express.json());

// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

//----------------
const multer = require("multer");

function getSystemTime() {
  return Date.now();
}

// function customTrimString(name) {
//   let finalFileName = "";
//   for (let i = 0; i < name.length; i++) {
//     if (name.charAt(i) != " ") {
//       finalFileName = finalFileName + name.charAt(i);
//     }
//   }

//   return finalFileName;
// }

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads");
  },
  async filename(req, file, cb) {
    const newFilePath = getSystemTime() + "_" + file.originalname;
    //let newCustomPath = await customTrimString(newFilePath);
    console.log("New Image Path : " + newFilePath);
    cb(null, newFilePath);
  },
});
const uploadWithCustomSettings = multer({ storage });

//-----------

// Simple welcome API
app.get("/welcome", (req, res) => {
  return res.status(200).json({
    status: "success",
    message: "Your backend server is working successfully!",
  });
});

app.post(
  "/profile",
  uploadWithCustomSettings.single("avatar"),
  function (req, res) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any

    return res.status(200).json({
      status: "success",
      message: "File uploaded successfully!",
    });
  }
);

app.post(
  "/get-file-name",
  uploadWithCustomSettings.single("avatar"),
  function (req, res) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any

    return res.status(200).json({
      status: "success",
      message: "File uploaded successfully!",
      fileName: req.file.filename,
    });
  }
);

app.post(
  "/profileWithDetails",
  uploadWithCustomSettings.single("avatar"),
  function (req, res) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any

    const name = req.body.name;
    const age = req.body.age;
    const address = req.body.address;

    return res.status(200).json({
      status: "success",
      message: "File uploaded successfully!",
      name: name,
      age: age,
      address: address,
    });
  }
);

app.post(
  "/multiple-photos",
  uploadWithCustomSettings.array("photos", 3),
  function (req, res) {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any

    return res
      .status(200)
      .json({ status: "success", message: "Files uploaded successfully!" });
  }
);

const cpUpload = uploadWithCustomSettings.fields([
  { name: "avatar", maxCount: 1 },
  { name: "gallery", maxCount: 4 },
]);
app.post("/mixed-files-upload", cpUpload, function (req, res) {
  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
  //
  // e.g.
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body will contain the text fields, if there were any

  return res
    .status(200)
    .json({ status: "success", message: "Files uploaded successfully!" });
});

app.listen(3000);
