const express = require("express");
const router = express.Router();
const JSRSASign = require("jsrsasign");
const dayjs = require("dayjs");

const User = require("../../models/User");

const dateSort = (property) => (obj1, obj2) =>
{
  const a = obj1[property] ? new Date(obj1[property].toString()) : 0;
  const b = obj2[property] ? new Date(obj2[property].toString()) : 0;

  if (a === b)
  {
    return 0;
  }

  return (a > b ? -1 : 1);
};

const completionSort = (obj1, obj2) =>
{
  const a = obj1.complete;
  const b = obj2.complete;

  if (a === b)
  {
    return 0;
  }

  return (a < b ? -1 : 1);
};

const listSort = (list) =>
{
  list.sort(dateSort("dateCreated"));
  list.sort(dateSort("dateCompleted"));
  list.sort(completionSort);
  return list;
};

/** @route  GET api/user/tasks
 *  @desc   Get user's list
 *  @access Public
 */
router.get("/tasks", (req, res) =>
{
  User.findById(res.locals._id, (err, doc) => res.json(listSort(doc.list)));
});

/** @route  POST api/user/tasks/add
 *  @desc   Add new item to user's list
 *  @access Public
 */
router.post("/tasks/add", (req, res) =>
{
  const newItem = {
    body: req.body.body,
    priority: req.body.priority
  };

  User.findOneAndUpdate({_id: res.locals._id}, {$push: {list: newItem}}, {new: true})
    .then((doc) => res.status(201).json(listSort(doc.list)))
    .catch(err => res.status(404).json(err));
});

/** @route  PUT api/user/tasks/:id
 *  @desc   Update item in user's list
 *  @access Public
 */
router.put("/tasks/:id", (req, res) =>
{
  User.findById(res.locals._id)
    .then(doc =>
    {
      let item = doc.list.find(item => item._id.toString() === req.params.id);

      item.body = req.body.body;
      item.priority = req.body.priority;
      item.dateModified = new Date();

      doc.save()
        .then(() => res.json(listSort(doc.list)))
        .catch(err => res.status(404).json(err));
    })
    .catch(err => res.status(404).json(err));
});

/** @route  POST api/user/tasks/:id
 *  @desc   Toggle completed field
 *  @access Public
 */
router.post("/tasks/:id", (req, res) =>
{
  User.findById(res.locals._id)
    .then(doc =>
    {
      let item = doc.list.find(item => item._id.toString() === req.params.id);
      item.complete = !(item.complete);
      item.dateCompleted = item.complete ? new Date() : null;
      item.dateModified = new Date();

      doc.save()
        .then(() => res.json(listSort(doc.list)))
        .catch(err => res.status(404).json(err));
    })
    .catch(err => res.status(404).json(err));
});

/** @route  DELETE api/user/tasks/:id
 *  @desc   Delete item from user's list
 *  @access Public
 */
router.delete("/tasks/:id", (req, res) =>
{
  User.findOneAndUpdate({_id: res.locals._id}, {$pull: {list: {_id: req.params.id}}}, {new: true})
    .then((doc) => res.json(listSort(doc.list)))
    .catch(err => res.status(404).json(err));
});

/** @route  PUT api/user/email
 *  @desc   Set user email
 *  @access Public
 */
router.put("/email", (req, res) =>
{
  User.findById(res.locals._id)
    .then(doc =>
    {
      doc.email = req.body.address;

      doc.save()
        .then(() => res.status(208).end())
        .catch(err => res.status(404).json(err));
    })
    .catch(err => res.status(404).json(err));
});

/** @route  POST api/user/email/verify
 *  @desc   Process email verification request
 *  @access Public
 */
router.post("/email/verify", (req, res) =>
{
  try
  {
    const aJWT = req.body.token.split(".");
    const uClaim = JSRSASign.b64utos(aJWT[1]);
    const pClaim = JSRSASign.jws.JWS.readSafeJSONString(uClaim);

    const exp = dayjs.unix(pClaim.expiration); // .format("MM-DD-YYYY hh:mma")

    if (exp.isBefore(dayjs()))
    {
      return res.status(400).json("The provided verification token has expired");
    }

    User.findById(pClaim.id)
      .then(doc =>
      {
        if (doc.emailVerified)
        {
          return res.status(400)
            .json("The email address associated with this account has already been verified");
        }

        doc.emailVerified = true;
        doc.email = pClaim.address;

        doc.save()
          .then(() => res.status(200).end())
          .catch(err => res.status(404).json(err));
      })
      .catch(err => res.status(404).json(err));
  }
  catch
  {
    return res.status(500).json("The verification token could not be processed");
  }
});

module.exports = router;
