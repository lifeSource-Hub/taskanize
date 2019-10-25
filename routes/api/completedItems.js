const express = require("express");
const router = express.Router();

const CompleteItem = require("../../models/CompleteItem");

/** @route  GET api/complete
 *  @desc   Get all completed items
 *  @access Public
 */
router.get("/", (req, res) =>
{
  CompleteItem.find()
      .sort({dateCreated: -1})
      .then(items => res.json(items));
});

/** @route  DELETE api/complete/:id
 *  @desc   Delete a completed item
 *  @access Public
 */
router.delete("/:id", (req, res) =>
{
  CompleteItem.findById(req.params.id)
      .then(item =>
      {
        item.remove().then(() => res.json({success: true}));
      })
      .catch(err => res.status(404).json({success: false}));
});

module.exports = router;
