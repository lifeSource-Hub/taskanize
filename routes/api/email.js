const express = require("express");
const router = express.Router();
const sgMail = require('@sendgrid/mail');
const JSRSASign = require("jsrsasign");
const bcrypt = require("bcryptjs");
const dayjs = require("dayjs");
const User = require("../../models/User");

const salt = bcrypt.genSaltSync(10);
const jwtHeader = {
  typ: "JWT",
  alg: "HS512"
};

const devEmail = "lifesourcedev@gmail.com";

/** @route  GET api/email/check
 *  @desc   Check if user email address is on file
 *  @access Public
 */
router.get("/check", (req, res) =>
{
  User.findById(res.locals._id)
    .then(doc =>
    {
      if (doc.emailVerified)
      {
        return res.json({verified: true});
      }
      else
      {
        return res.json({verified: false});
      }
    })
    .catch(err => res.status(404).json(err));
});

/** @route  POST api/email/verify/send
 *  @desc   Email a verification request
 *  @access Public
 */
router.post("/verify/send", (req, res) =>
{
  if (!req.body)
  {
    return res.status(400).json({msg: "Required fields missing"});
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const expiration = dayjs(dayjs().add(1, "hour"));

  const verificationInfo = {
    id: req.body.id,
    address: req.body.address,
    expiration: expiration.unix()
  };

  const sHeader = JSON.stringify(jwtHeader);
  const sPayload = JSON.stringify(verificationInfo);
  const sJWT = JSRSASign.jws.JWS.sign("HS512", sHeader, sPayload, process.env.JWT_KEY);

  // TODO create page and functions for incorrect recipients
  const emailBody =
    `<p>You have received this email because a <a href='https://taskanize.herokuapp.com/'>Taskanize</a> 
      user is trying to verify their email. If you have received this email by mistake, 
      please click <a href='https://taskanize.herokuapp.com/contact'>here</a>. 
    </p> 
    <p> 
    To verify your Taskanize account, click
    <a href='https://taskanize.herokuapp.com/user/email/verify?token=${sJWT}'> here</a>. 
    </p>`;

  const email = {
    to: req.body.address,
    from: devEmail,
    subject: "Taskanize Email Verification",
    html: emailBody
  };

  sgMail.send(email)
    .then(email => res.status(202).end())
    .catch(err => res.status(500).json(err));
});

/** @route  POST api/email/schedule
 *  @desc   Schedule an email
 *  @access Public
 */
router.post("/schedule", (req, res) =>
{
  if (!req.body)
  {
    return res.status(400).json({msg: "Required fields missing"});
  }

  User.findById(res.locals._id, (err, doc) =>
  {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const userEmail = doc.email;

    const email = {
      to: req.body.to,
      from: userEmail,
      subject: req.body.subject,
      html: req.body.body,
      sendAt: req.body.sendAt
    };

    sgMail.send(email)
      .then(email => res.status(202).end())
      .catch(err => res.status(500).json(err));
  });
});

module.exports = router;
