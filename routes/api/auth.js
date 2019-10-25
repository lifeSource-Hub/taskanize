const express = require("express");
const router = express.Router();
const JSRSASign = require("jsrsasign");
const Users = require("../../models/Users");

const jwtHeader = {
  typ: "JWT",
  alg: "HS512"
};

router.get("/", (req, res) =>
{
  if (req.body.token)
  {
    const sJWT = req.body.token;

    console.log("Valid token: ", JSRSASign.jws.JWS.verifyJWT(sJWT, process.env.JWT_KEY, {alg: ["HS512"]}));
    const aJWT = sJWT.split(".");
    const uHeader = JSRSASign.b64utos(aJWT[0]);
    const uClaim = JSRSASign.b64utos(aJWT[1]);

    const pHeader = JSRSASign.jws.JWS.readSafeJSONString(uHeader);
    const pClaim = JSRSASign.jws.JWS.readSafeJSONString(uClaim);

    return res.status(200).json({header: pHeader, claim: pClaim});
  }
  else
  {
    return res.status(400).json({msg: "Required field(s) missing"});
  }
});

/** @route  POST api/auth
 *  @desc   Search for user, return JWT on success
 *  @access Public
 */
router.post("/", (req, res) =>
{
  if (!req.body.username || !req.body.password)
  {
    return res.status(400).json({msg: "Required field(s) missing"});
  }

  const claims = {
    username: req.body.username,
    password: req.body.password
  };
  // console.log(claims);

  Users.findOne({username: claims.username}, (err, user) =>
  {
    if (user)
    {
      if (user.password === req.body.password)
      {
        const sHeader = JSON.stringify(jwtHeader);
        const sClaims = JSON.stringify(claims);

        const sJWT = JSRSASign.jws.JWS.sign("HS512", sHeader, sClaims, process.env.JWT_KEY);

        // console.log(JSRSASign.jws.JWS.verifyJWT(sJWT, process.env.JWT_KEY, {alg: ["HS512"]}));
        // const aJWT = sJWT.split(".");
        // const uHeader = JSRSASign.b64utos(aJWT[0]);
        // const uClaim = JSRSASign.b64utos(aJWT[1]);
        // const pHeader = JSRSASign.jws.JWS.readSafeJSONString(uHeader);
        // const pClaim = JSRSASign.jws.JWS.readSafeJSONString(uClaim);

        return res.status(200).json(sJWT);
      }

      return res.status(404).json({msg: "Password does not match"});
    }
    else if (err)
    {
      return res.status(500).json(err);
    }
    else
    {
      return res.status(404).json({msg: "User not found"});
    }
  });
});

module.exports = router;
