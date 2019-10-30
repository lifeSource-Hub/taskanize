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
router.get("/", (req, res) =>
{
  User.findById(res.locals._id,
      function (err, doc)
      {
        listSort(doc.list);
        res.json(doc.list);
      });
});

/** @route  POST api/user/list/add
 *  @desc   Add new item to user's list
 *  @access Public
 */
router.post("/add", (req, res) =>
{
  const newItem = {
    body: req.body.body,
    priority: req.body.priority
  };

  User.updateOne({_id: res.locals._id}, {$push: {list: newItem}})
      .then(() => res.json({success: true}))
      .catch(err => res.status(404).json(err));
});

/** @route  PUT api/user/list/:id
 *  @desc   Update item in user's list
 *  @access Public
 */
router.put("/:id", (req, res) =>
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
router.post("/:id", (req, res) =>
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
router.delete("/:id", (req, res) =>
{
  User.updateOne({_id: res.locals._id}, {$pull: {list: {_id: req.params.id}}}, {"new": true})
      .then(() => res.json({success: true}))
      .catch(err => res.status(404).json(err));
});

module.exports = router;
