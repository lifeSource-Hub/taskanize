const cors = require('cors');
const express = require('express');
const app = express();
const miniApp = express.Router();
const port = process.env.PORT || 5000;

app.use(cors());

// const uri = process.env.ATLAS_URI;
// mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

miniApp.get('/home', (request, response, next) =>
{
  const url = request.originalUrl;

  response.status(200).send("You are visiting  home from " )
});

app.use('/first', miniApp);
app.use('/second', miniApp);

app.listen(port, () => console.log('Web Server running on port 5000'),);
