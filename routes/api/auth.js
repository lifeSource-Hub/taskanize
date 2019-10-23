const express = require("express");
const router = express.Router();

const Users = require("../../models/Users");

// TODO Update $desc
/** @route  POST api/auth
 *  @desc   Get all items
 *  @access Public
 */
router.post("/", (req, res) =>
{
  const reqUser = {
    username: req.body.username,
    password: req.body.password
  };

  Users.findOne({username: req.body.username}, (err, user) =>
  {
    if (user)
    {
      if (user.password === req.body.password)
      {
        return res.status(200).json(user);
      }

      return res.status(200).json({msg: "Password does not match"});
    }
    else if (err)
    {
      return res.json(err);
    }
    else
    {
      return res.json({msg: "User not found"});
    }
  });
});

module.exports = router;
