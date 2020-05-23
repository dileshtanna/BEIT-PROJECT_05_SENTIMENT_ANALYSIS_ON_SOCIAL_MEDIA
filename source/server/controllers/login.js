const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")

const JWTSecretKey = config.get("jwtPrivateKey")

const Users = require("../models/User")

module.exports.login = async (req, res, next) => {
  const username = req.body.username
  const password = req.body.password

  const user = await Users.find({ username })
  if (user.length === 0) return res.status(404).json("User Not Found")

  bcrypt.compare(password, user[0].password).then(isMatch => {
    if (isMatch) {
      const payload = {
        id: user[0]._id,
        firstName: user[0].first_name,
        lastName: user[0].last_name,
        username: user[0].username,
        score: user[0].score,
        isAdmin: user[0].isAdmin
      }

      jwt.sign(payload, JWTSecretKey, (err, token) => {
        res.json({
          success: true,
          token: token
        })
      })
    } else {
      return res.status(400).json("Password incorrect")
    }
  })
}
