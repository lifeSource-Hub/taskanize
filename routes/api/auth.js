const express = require("express");
const router = express.Router();
const JSRSASign = require("jsrsasign");

/** @route  /api/incomplete || /api/complete
 *  @desc   Catch all list related requests and verify token for CRUD operations
 *  @access Public
 */
router.all("/*", (req, res, next) =>
{
  // console.log(req.method);

  // // Don't authenticate read (GET) requests
  if (req.method === "GET")
  {
    return next();
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
        {alg: ["HS512"]}));

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
