const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//get a user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/usersList', function(req, res) {
  User.find({}, function(err, users) {
    var userMap = {};

    users.forEach(function(user) {
      userMap[user.email] = user._id;
    });

    res.send(userMap);  
  });
});
module.exports = router;
