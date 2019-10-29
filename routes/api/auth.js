const express = require("express");
const router = express.Router();
const JSRSASign = require("jsrsasign");

/** @route  /api/users
 *  @desc   Verify user token and attach user id to header
 *  @access Public
 */
router.all("/*", (req, res, next) =>
{
  // console.log(req.method);
  if (req.get("authToken"))
  {
    // For testing response to invalid tokens
    const junkToken = "eyJ0eXniOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyt1c2VybmFtZSI6Im5pY2siLCJwYXNzd29yZCI6ImZ1cnkifQ.cqMYayDWO0CVzfTw66zfG95429IVXF9Q0W2PXQIkZl\n" +
        "6Zu0RaLTi1YMyZmNWrj7zWY-KXbmHP1iyHpxNoKz1Wkx";

    const sJWT = req.get("authToken");

    const tokenIsValid = (JSRSASign.jws.JWS.verifyJWT(
        sJWT,
        process.env.JWT_KEY,
        {alg: ["HS512"]}));

    const aJWT = sJWT.split(".");
    const uClaim = JSRSASign.b64utos(aJWT[1]);
    const pClaim = JSRSASign.jws.JWS.readSafeJSONString(uClaim);
    res.locals._id = pClaim._id;

    if (tokenIsValid)
    {
      return next();
    }
  }
  else
  {
    res.sendStatus(401);
  }
});

module.exports = router;
