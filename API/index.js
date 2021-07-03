const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const configuraciones = require('./routes/configuracion');
const users = require('./routes/users');
const bookshelfs = require('./routes/bookshelfs');
const books = require('./routes/books');
const reminders = require("./routes/reminders");


require('dotenv').config();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

app.use('/configuraciones', configuraciones);
app.use('/users', users);
app.use('/bookshelfs', bookshelfs);
app.use('/books', books);
app.use('/reminders', reminders);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  return;
});

app.listen(port, () => {
  console.log(`Inventarium API listening at http://api:${port}`)
});


app.use(cors);