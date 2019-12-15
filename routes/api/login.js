const express = require("express");
const router = express.Router();
const JSRSASign = require("jsrsasign");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");

const jwtHeader = {
  alg: "HS512",
  typ: "JWT",
};

/** @route  POST api/login
 *  @desc   Search for user, return JWT on success
 *  @access Public
 */
router.post("/", (req, res) =>
{
  if (!req.body.username || !req.body.password)
  {
    return res.status(400).json({msg: "Required fields missing"});
  }

  const claims = {
    username: req.body.username,
    password: req.body.password
  };

  User.findOne({username: claims.username}, (err, user) =>
  {
    if (user)
    {
      if (bcrypt.compareSync(claims.password, user.password))
      {
        claims._id = user._id;

        const sHeader = JSON.stringify(jwtHeader);
        const sClaims = JSON.stringify(claims);

        const sJWT = JSRSASign.jws.JWS.sign("HS512", sHeader, sClaims, process.env.JWT_KEY);

        return res.status(200).json({userId: user._id, authToken: sJWT});
      }

      return res.status(404).json({msg: "Username and/or password are incorrect"});
    }
    else if (err)
    {
      return res.status(500).json(err);
    }
    else
    {
      return res.status(404).json({msg: "Username and/or password are incorrect"});
    }
  });
});

module.exports = router;
