# "**Hello World**" REST API backend

## Create project

```
# redirect to your Desktop or projects folder
cd Desktop

# create a folder
sudo mkdir hello_world

# move to that folder
cd hello_world

# create a project
npm init
```

Give your project a name i.e. **Hello World**

Press just enter, enter, enter until you crete the project. We will create necessary files later. Now open your **hello_world** folder with **Visual Studio Code**. Open the **Terminal** window from top left corner of Visual Studio Code.

We need to install **Express** framework which will help us to create REST APIs with Node.js

```
npm install express
```

Install **nodemon** plugin. This plugin will help us to test our backend server very fast! It will restart the server everytime when we make any change/edit.

```
npm install nodemon
```

Go to your project. Create a file named **app.js**. Paste the code below into your **app.js** file.

```
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000);

```

Go to your **package.json** file. Replace current code with the code below:

```
{
  "name": "Hello World",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "start": "nodemon app.js"
  },
  "author": "Mahbubur Rahman Turzo",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.1",
    "nodemon": "^2.0.18"
  }
}

```

You will see a file named **package-lock.json** has been created. Don't worry about this file. It will manage our installed packages automatically.

Now start your server by just this command below:

```
npm start
```

If everything is ok, you will see your sever started successfully!
Open Postman or any browser and type **localhost:3000** or **your_ip:3000**. If you see the output as **"Hello World"** then your NodeJS backend server is working successfully!

### **Congratulations!**

You successfully created your first NodeJS REST API backend application!

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
