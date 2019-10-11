const cors = require('cors');
const express = require('express');
const app = express();
const miniApp = express.Router();

app.use(cors());

// miniApp.get('/home', (request, response, next) =>
// {
//   const url = request.originalUrl;
//   response
//       .status(200)
//       .send(`You are visiting /home from ${url}`)
// });
miniApp.get('/home', (request, response, next) =>
{
  response.status(200).send("You are visiting /home ");
});

app.use('/first', miniApp);
app.use('/second', miniApp);

app.listen(5000, () => console.log('Web Server running on port 5000'),);
