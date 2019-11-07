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
  User.countDocuments({}, (err, count) =>
  {
    console.log(count);

    if (count > 50)
    {
      res.status(507).json(count);
    }
    else
    {
      const hash = bcrypt.hashSync(req.body.password, salt);

      const newUser = new User({
        username: req.body.username,
        password: hash
      });

      newUser.save()
          .then(item => res.status(201).json(item))
          .catch(err =>
          {
            if (err.code === 11000)
            {
              res.status(409).json(err);
            }
            else
            {
              res.status(500).json(err);
            }
          });
    }
  });


});


module.exports = router;
