# "**Test App**" REST API backend

## Create project

```
# redirect to your Desktop or projects folder
cd Desktop

# create a folder
sudo mkdir test_app

# move to that folder
cd test_app

# create a project
npm init
```

Give your project a name i.e. **Test App**

Press just enter, enter, enter until you crete the project. We will create necessary files later. Now open your **test_app** folder with **Visual Studio Code**. Open the **Terminal** window from top left corner of Visual Studio Code.

We need to install **Express** framework which will help us to create REST APIs with Node.js

```
npm install express
```

Install **nodemon** plugin. This plugin will help us to test our backend server very fast! It will restart the server everytime when we make any change/edit.

```
npm install nodemon
```

We will need another plugin.

```
sudo npm install multiparty
```

Go to your project. Create a file named **app.js**. Paste the code below into your **app.js** file.

```
const express = require("express");
const multiparty = require("multiparty");
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

// Dummy POST API - form data
app.post("/squareFormData", (req, res) => {
  const form = new multiparty.Form();

  form.parse(req, function (err, fields, files) {
    //---------
    const value = fields.value;
    const square = value * value;
    return res.status(200).json({
      status: "success",
      value: square,
      message: "This POST api will return the square of a value - Form Data",
    });

    //---------------
  });
});

app.listen(3000);


```

Go to your **package.json** file. Replace current code with the code below:

```
{
  "name": "test.app",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "start": "nodemon app.js"
  },
  "author": "Mahbubur Rahman Turzo",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.1",
    "multiparty": "^4.2.3",
    "nodemon": "^2.0.18"
  }
}


```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
