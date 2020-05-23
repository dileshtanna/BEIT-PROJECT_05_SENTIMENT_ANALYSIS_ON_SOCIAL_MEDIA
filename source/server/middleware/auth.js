// jsonwebtoken is teh node module that generates the JWT. Regular npm install. No additional configuration needed.
const jwt = require("jsonwebtoken");
const config = require("config");

function authToken(req, res, next) {
  const bearerHeader = req.header("Authorization");
  if (!bearerHeader)
    return res.status(401).send("Access Denied. No token provided.");
  const bearer = bearerHeader.split(" ");
  const token = bearer[1];
  if (!token) return res.status(401).send("Access Denied. No token provided.");

  try {
    // instead of jwt.sign, using jwt.verify to verify if it is a valid token
    // const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    // returns the value of the jwt if the token is verified
    // console.log(decoded);
    req.user = decoded;
    next();
  } catch (e) {
    console.log(e);
    res.status(400).send("Invalid token.");
  }
}

module.exports = authToken;
