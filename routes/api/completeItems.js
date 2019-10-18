const express = require("express");
const router = express.Router();

const CompleteItem = require("../../models/CompleteItem");
const IncompleteItem = require("../../models/IncompleteItem");

/** @route  GET list
 *  @desc   Get all items
 *  @access Public
 */
router.get("/", (req, res) =>
{
  CompleteItem.find()
      .sort({dateCreated: -1})
      .then(items => res.json(items));
});

/** @route  POST list/:id
 *  @desc   Move item from incomplete to complete collection
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
      .catch(err => res.status(404).json({success: false}));
});

module.exports = router;
