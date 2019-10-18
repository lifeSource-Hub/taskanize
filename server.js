// require("dotenv").config();
// const router = express.Router();
const cors = require('cors');
const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const items = require("./routes/api/items");
const completeItems = require("./routes/api/completeItems");
const port = process.env.PORT || 5000;

app.use(cors({credentials: true, origin: true})); //{credentials: true, origin: true}
app.use(express.json());

// const uri = process.env.ATLAS_URI;
// mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
//// mongoose.connect('mongodb://127.0.0.1:27017/todos', {useNewUrlParser: true});
//// const connection = mongoose.connection;
//// connection.once('open', function ()
//// {
////   console.log("MongoDB database connection established successfully");
//// });

const db = require("./config/keys").mongoURI;

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err));

app.use("/list", items);
app.use("/complete", completeItems);

// Serve static assets if in production
if (process.env.NODE_ENV === "production")
{
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
  {
    res.sendFile(path.join(__dirname, 'client/build/index.html'), err =>
    {
      if (err)
      {
        res.status(500).send(err)
      }
    })
  });
// Alternate
//   app.get("*", (req, res) =>
//   {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
}

app.listen(port, () => console.log(`Server started on port ${port}`));
