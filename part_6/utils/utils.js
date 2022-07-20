const jwt = require("jsonwebtoken");
const my_secret_key = "sdfsdffss@#%$@#$SDFSDFSFS#@$#%#$dfssgg5676dfgdf4535353";
const userModel = require("../model/userModel");

function generateAccessToken(data) {
  return jwt.sign({ data }, my_secret_key, { expiresIn: "24h" });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, my_secret_key, (err, user) => {
      if (err) {
        //return res.sendStatus(403);
        return res.json({
          status: 403,
          msg: "Not Allowed",
        });
      }

      console.log("User found in token : " + user.data.email);

      userModel.findOne({ email: user.data.email }, function (err, newUser) {
        if (err) return res.json({ status: 501, data: "User not found!" });

        req.user = newUser;
        next();
      });
    });
  } else {
    //res.sendStatus(401);
    return res.json({
      status: 401,
      msg: "Unauthorized",
    });
  }
}

module.exports = { generateAccessToken, authenticateToken };
