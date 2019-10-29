const express = require("express");
const router = express.Router();
const JSRSASign = require("jsrsasign");

const Users = require("../../models/Users");

const sortBy = (obj1, obj2) =>
{
  const a = new Date(obj1.dateCreated);
  const b = new Date(obj2.dateCreated);

  if (a === b)
  {
    return 0;
  }

  return a < b;
};

/** @route  GET api/users
 *  @desc   Get user's list
 *  @access Public
 */
router.get("/", (req, res) =>
{
  // console.log("Search for: ", res.locals._id);
  Users.findById(res.locals._id, "list",
      function (err, doc)
      {
        // console.log(doc);
        res.json(doc.list.sort(sortBy));
      });
});

/** @route  POST api/users
 *  @desc   Add new item to user's list
 *  @access Public
 */
router.post("/add", (req, res) =>
{
  const newItem = {
    body: req.body.body,
    priority: req.body.priority
  };

  Users.updateOne({_id: res.locals._id}, {$push: {list: newItem}})
      .then(() => res.json({success: true}))
      .catch(err => res.status(404).json(err));
});

/** @route  PUT api/incomplete/:id
 *  @desc   Update item in user's list
 *  @access Public
 */
router.put("/:id", (req, res) =>
{
  Users.findById(res.locals._id)
      .then(doc =>
      {
        let item = doc.list.find(item => item._id.toString() === req.params.id);

        item.body = req.body.body;
        item.priority = req.body.priority;
        item.dateModified = new Date();

        doc.save()
            .then(() => res.json(doc.list.sort(sortBy)))
            .catch(err => res.status(404).json(err));
      })
      .catch(err => res.status(404).json(err));
});

/** @route  POST api/users/:id
 *  @desc   Toggle completed field
 *  @access Public
 */
router.post("/:id", (req, res) =>
{
  Users.findById(res.locals._id)
      .then(doc =>
      {
        let item = doc.list.find(item => item._id.toString() === req.params.id);
        item.complete = !(item.complete);

        doc.save()
            .then(() => res.json(doc.list.sort(sortBy)))
            .catch(err => res.status(404).json(err));
      })
      .catch(err => res.status(404).json(err));
});

/** @route  DELETE api/users/:id
 *  @desc   Delete item from user's list
 *  @access Public
 */
router.delete("/:id", (req, res) =>
{
  Users.updateOne({_id: res.locals._id}, {$pull: {list: {_id: req.params.id}}}, {"new": true})
      .then(() => res.json({success: true}))
      .catch(err => res.status(404).json(err));
});

module.exports = router;
