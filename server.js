require("dotenv").config();
const cors = require('cors');
const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
mongoose.set("useCreateIndex", true);
mongoose.set('useFindAndModify', false);
const auth = require("./routes/api/auth");
const user = require("./routes/api/user");
const email = require("./routes/api/email");
const login = require("./routes/api/login");
const register = require("./routes/api/register");
const port = process.env.PORT || 5000;

app.use(cors({credentials: true, origin: true}));
app.use(express.json());

const db = process.env.MONGODB_URI || process.env.MONGODB_LOCALHOST_URI;

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err));

app.use("/api/auth", auth);
app.use("/api/user", auth, user);
app.use("/api/email", auth, email);
app.use("/api/login", login);
app.use("/api/user/email/verify", email);
app.use("/api/register", register);

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
        res.status(500).send(err);
      }
    })
  });
}

app.listen(port, () => console.log(`Server started on port ${port}`));
