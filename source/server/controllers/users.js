const Users = require("../models/User");
const Posts = require("../models/Posts");
module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await Users.find({}).sort({ score: 1 });

    res.status(200).json({
      status: 200,
      data: users,
      message: "Retrieved all Users"
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getSingleUserPosts = async (req, res, next) => {
  const { username } = req.params;
  try {
    const result = await Posts.find({ username });
    res.status(200).json({
      status: 200,
      data: result,
      message: "Retrieved all Posts"
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserScore = async (req, res, next) => {
  let { username } = req.params;
  try {
    const score = await Users.findOne({ username }).select({ score: 1 });
    res.status(200).json({
      status: 200,
      data: score,
      message: "Retrieved Score"
    });
  } catch (err) {
    next(err);
  }
};
