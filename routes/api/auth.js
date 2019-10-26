const express = require("express");
const router = express.Router();
const JSRSASign = require("jsrsasign");

/** @route  TODO
 *  @desc   TODO
 *  @access Public
 */
router.all("/*", (req, res, next) =>
{
  console.log(req.method);
  if (req.method === "GET")
  {
    next();
  }
  else if (req.get("authToken"))
  {
    // For testing response to invalid tokens
    const junkToken = "eyJ0eXniOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyt1c2VybmFtZSI6Im5pY2siLCJwYXNzd29yZCI6ImZ1cnkifQ.cqMYayDWO0CVzfTw66zfG95429IVXF9Q0W2PXQIkZl\n" +
        "6Zu0RaLTi1YMyZmNWrj7zWY-KXbmHP1iyHpxNoKz1Wkx";

    const sJWT = req.get("authToken");

    const tokenIsValid = (JSRSASign.jws.JWS.verifyJWT(
        sJWT,
        process.env.JWT_KEY,
        {alg: [process.env.JWT_ALGORITHM]}));

    console.log("Token is valid: ", tokenIsValid);

    if (tokenIsValid)
    {
      next();
      // return res.status(200).json({valid: tokenIsValid});
    }
  }
  // else
  // {
  //   return res.status(400).json({msg: "Invalid credentials"});
  // }
});

module.exports = router;
