const express = require("express");
const router = express.Router();

const Item = require("../../models/Item");

/** @route  GET list
 *  @desc   Get all items
 *  @access Public
 */
router.get("/", (req, res) =>
{
  // const url = req.originalUrl;
  // res.status(200).send(`Request URL: ${url}`);
  Item.find()
      .sort({date: -1})
      .then(items => res.json(items));
});

/** @route  POST list
 *  @desc   Create an item
 *  @access Public
 */
router.post("/", (req, res) =>
{
  const newItem = new Item({
    body: req.body.body
  });

  // console.log(newItem);
  // res.status(200).send();
  newItem.save().then(item => res.json(item));
});

/** @route  delete list/:id
 *  @desc   Delete an item
 *  @access Public
 */
router.delete("/:id", (req, res) =>
{
  // const id = req.params.id;
  // res.status(200).send("Deleting " + id);
  Item.findById(req.params.id)
      .then(item => item.remove()
          .then(() => res.json({success: true})))
      .catch(err => res.status(404).json({success: false}));
});

module.exports = router;
