const express = require("express");
const router = express.Router();
const JSRSASign = require("jsrsasign");

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

/** @route  GET api/user/list
 *  @desc   Get user's list
 *  @access Public
 */
router.get("/list", (req, res) =>
{
  User.findById(res.locals._id, (err, doc) => res.json(listSort(doc.list)));
});

/** @route  POST api/user/list/add
 *  @desc   Add new item to user's list
 *  @access Public
 */
router.post("/list/add", (req, res) =>
{
  const newItem = {
    body: req.body.body,
    priority: req.body.priority
  };

  User.findOneAndUpdate({_id: res.locals._id}, {$push: {list: newItem}}, {new: true})
    .then((doc) => res.status(201).json(listSort(doc.list)))
    .catch(err => res.status(404).json(err));
});

/** @route  PUT api/user/list/:id
 *  @desc   Update item in user's list
 *  @access Public
 */
router.put("/list/:id", (req, res) =>
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

/** @route  POST api/user/list/:id
 *  @desc   Toggle completed field
 *  @access Public
 */
router.post("/list/:id", (req, res) =>
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

/** @route  DELETE api/user/list/:id
 *  @desc   Delete item from user's list
 *  @access Public
 */
router.delete("/list/:id", (req, res) =>
{
  User.findOneAndUpdate({_id: res.locals._id}, {$pull: {list: {_id: req.params.id}}}, {new: true})
    .then((doc) => res.json(listSort(doc.list)))
    .catch(err => res.status(404).json(err));
});

// TODO Complete function
/** @route  GET api/user/email/check
 *  @desc   Check if user email address is on file
 *  @access Public
 */
router.get("/email/check", (req, res) =>
{
  // console.log(res.locals._id);

  User.findById(res.locals._id, (err, doc) =>
  {
    // console.log(typeof doc.email, ": ", doc.email);

    if (doc.email !== "")
    {
      console.log("Has email");
    }
    else
    {
      console.log("No email");
    }
    res.json({});
  });
});

// TODO Complete function
/** @route  GET api/user/email/verify
 *  @desc   Check verification status of user's email
 *  @access Public
 */
router.get("/email/verify", (req, res) =>
{
  // console.log(res.locals._id);

  User.findById(res.locals._id, (err, doc) =>
  {
    // console.log(typeof doc.emailVerified, ": ", doc.emailVerified);

    if (doc.emailVerified)
    {
      console.log("Verified");
    }
    else
    {
      console.log("Not verified");
    }
    res.json({});
  });
});

module.exports = router;
