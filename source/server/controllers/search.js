const User = require("../models/User");

module.exports.search = async (req, res, next) => {
  const { query } = req.query;
  console.log(query);
  var re = new RegExp("" + query, "i");
  console.log(re);
  try {
    const results = await User.find(
      {
        $and: [
          {
            username: { $ne: req.user.username }
          },
          {
            $or: [
              {
                first_name: re
              },
              { last_name: re }
            ]
          }
        ]
      },
      "first_name last_name username"
    );
    res.status(200).json({
      status: 200,
      data: results,
      message: "Search results retrieved"
    });
  } catch (err) {
    next(err);
  }
};
