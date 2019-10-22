const express = require("express");
const router = express.Router();

const IncompleteItem = require("../../models/IncompleteItem");

/** @route  GET api/incomplete
 *  @desc   Get all items
 *  @access Public
 */
router.get("/", (req, res) =>
{
  IncompleteItem.find()
      .sort({dateCreated: -1})
      .then(items => res.json(items));
});

/** @route  POST api/incomplete
 *  @desc   Create an item
 *  @access Public
 */
router.post("/add", (req, res) =>
{
  const newItem = new IncompleteItem({
    body: req.body.body,
    priority: req.body.priority
  });

  newItem.save().then(item => res.json(item));
});

/** @route  PUT api/incomplete/:id
 *  @desc   Update an item
 *  @access Public
 */
router.put("/:id", (req, res) =>
{
  IncompleteItem.findById(req.params.id)
      .then(item =>
      {
        item.body = req.body.body;
        item.dateModified = new Date();
        item.save()
            .then(() => res.json({success: true}))
            .catch(err => res.status(404).json({success: false}));
      })
      .catch(err => res.status(404).json({success: false}));
});

/** @route  DELETE api/incomplete/:id
 *  @desc   Delete an item
 *  @access Public
 */
router.delete("/:id", (req, res) =>
{
  // const id = req.params.id;
  // res.status(200).send("Deleting " + id);
  IncompleteItem.findById(req.params.id)
      .then(item =>
          item.remove()
              .then(() => res.json({success: true})))
      .catch(err => res.status(404).json({success: false}));
});

module.exports = router;
