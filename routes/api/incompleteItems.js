const express = require("express");
const router = express.Router();
const JSRSASign = require("jsrsasign");

const IncompleteItem = require("../../models/IncompleteItem");
const CompleteItem = require("../../models/CompleteItem");

/** @route  GET api/incomplete
 *  @desc   Get all to-do items
 *  @access Public
 */
router.get("/", (req, res) =>
{
  IncompleteItem.find()
      .sort({dateCreated: -1})
      .then(items => res.json(items));
});

/** @route  POST api/incomplete
 *  @desc   Create a to-do item
 *  @access Public
 */
router.post("/add", (req, res) =>
{
  const newItem = new IncompleteItem({
    body: req.body.newItem.body,
    priority: req.body.newItem.priority
  });

  newItem.save().then(item => res.json(item));
});

/** @route  POST api/complete/:id
 *  @desc   Create completed item, delete to-do item
 *  @access Public
 */
router.post("/:id", (req, res) =>
{
  IncompleteItem.findById(req.params.id)
      .then(item =>
      {
        const completedItem = new CompleteItem({
          body: item.body,
          dateCreated: item.dateCreated
        });

        completedItem.save();
        item.remove().then(() => res.json({success: true}));
      })
      .catch(err => res.status(404).json(err));
});

/** @route  PUT api/incomplete/:id
 *  @desc   Update a to-do item
 *  @access Public
 */
router.put("/:id", (req, res) =>
{
  IncompleteItem.findById(req.params.id)
      .then(item =>
      {
        item.body = req.body.body;
        item.priority = req.body.priority;
        item.dateModified = new Date();
        item
            .save()
            .then(() => res.json({success: true}))
            .catch(err => res.status(404).json(err));
      })
      .catch(err => res.status(404).json(err));
});

/** @route  DELETE api/incomplete/:id
 *  @desc   Delete a to-do item
 *  @access Public
 */
router.delete("/:id", (req, res) =>
{
  // const id = req.params.id;
  // res.status(200).send("Deleting " + id);
  IncompleteItem.findById(req.params.id)
      .then(item => item.remove().then(() => res.json({success: true})))
      .catch(err => res.status(404).json(err));
});

module.exports = router;
