const express = require("express");
const router = express.Router();
const sgMail = require('@sendgrid/mail');
const bcrypt = require("bcryptjs");
const User = require("../../models/User");

const salt = bcrypt.genSaltSync(10);

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

/** @route  POST api/email/verify
 *  @desc   Email a verification request
 *  @access Public
 */
router.post("/verify", (req, res) =>
{
  res.json({});
  // if (req.body)
  // {
  //   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  //
  //   const hash = bcrypt.hashSync(req.body.address, salt);
  //   const verificationLink = "localhost:3000/verified/" + hash;
  //
  //   const html = `<p>A Taskanize user is attempting to verify their email address. If you did not
  //     make this request, please ignore this email.</p>
  //     <p>Click the link below to verify this address:</p><br/>
  //     <a href=${verificationLink}>${verificationLink}</a>`;
  //
  //   const email = {
  //     to: req.body.address,
  //     from: "lifesourcedev@gmail.com",
  //     subject: "Taskanize Email Verification",
  //     html: html
  //   };
  //
  //   sgMail.send(email)
  //     .then(email => res.status(202).json({emailVerified: true, emailSent: true}))
  //     .catch(err => res.status(500).json(err));
  // }
  // else
  // {
  //   return res.status(400).json({msg: "Required fields missing"});
  // }
});

/** @route  POST api/email/schedule
 *  @desc   Schedule an email
 *  @access Public
 */
router.post("/schedule", (req, res) =>
{
  if (req.body)
  {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const email = {
      to: req.body.to,
      from: req.body.from,
      subject: req.body.subject,
      html: req.body.body,
      sendAt: req.body.sendAt
    };

    sgMail.send(email)
      .then(email => res.status(202).json({emailSent: true}))
      .catch(err => res.status(500).json(err));
  }
  else
  {
    return res.status(400).json({msg: "Required fields missing"});
  }
});

module.exports = router;
