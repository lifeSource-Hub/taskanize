const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../../models/User");

const salt = bcrypt.genSaltSync(10);

/** @route  POST api/register
 *  @desc   Create new user collection
 *  @access Public
 */
router.post("/", (req, res) =>
{
  const hash = bcrypt.hashSync(req.body.password, salt);

  const newUser = new User({
    username: req.body.username,
    password: hash
  });

  // console.log("New User: ", newUser);

  newUser.save()
      .then(item => res.status(201).json(item))
      .catch(err =>
      {
        console.log(err);
        res.status(500).json(err);
      });
  // User.updateOne({_id: res.locals._id}, {list: newUser})
  //     .then(() => res.json({success: true}))
  //     .catch(err => res.status(404).json(err));
});


module.exports = router;
