const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/User");

module.exports.signUp = async (req, res, next) => {
  const {
    firstName,
    lastName,
    username,
    password,
    email,
    phone,
    isAdmin
  } = req.body;
  const user = await Users.find({ username });
  if (user.length > 0) return res.status(400).json("User already exists");

  bcrypt.genSalt(10, (err, salt) => {
    console.log(err, salt);
    if (err) throw err;
    bcrypt.hash(password, salt, async (err, hash) => {
      console.log(err, hash);
      if (err) throw err;
      let hashedPassword = hash;
      try {
        const newUser = new Users({
          first_name: firstName,
          last_name: lastName,
          username,
          password: hashedPassword,
          email,
          phone,
          score: 0,
          isAdmin
        });
        await newUser.save();

        res.status(200).json({
          status: 200,
          message: "Created One User"
        });
      } catch (err) {
        next(err);
      }
    });
  });
};
