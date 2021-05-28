const express = require('express');
const db = require('./db');

const app = express();

const user = require('./controllers/usercontroller');
const game = require('./controllers/gamecontroller')

app.use('/api/auth', user);
app.use(require('./middleware/validate-session'))
app.use('/api/game', game);

db.authenticate()
  .then(() => db.sync()) // => {force: true}
  .then(() => {
    app.listen(() =>
      console.log(`[Server: ] App is listening on Port 3000`)
    );
  })
  .catch((err) => {
    console.log("[Server: ] Server Crashed");
    console.error(err);
  });