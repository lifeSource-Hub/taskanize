const express = require("express");
const router = express.Router();
const sgMail = require('@sendgrid/mail');

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
      .then((email) => res.json({statusCode: email[0].statusCode}))
      .catch(err => res.status(500).json(err));
  }
  else
  {
    return res.status(400).json({msg: "Required fields missing"});
  }
});

module.exports = router;
