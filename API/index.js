const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const configuracion = require('./routes/configuracion');
const users = require('./routes/usuario');
const grupoobjetos = require('./routes/grupo_objetos');
const objeto = require('./routes/objeto');
const objetokit = require("./routes/objeto_kit");
const prestado = require("./routes/prestado");
const ubicacion = require("./routes/ubicacion");


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

app.use('/api/configuracion', configuracion);
app.use('/api/users', users);
app.use('/api/grupoobjetos', grupoobjetos);
app.use('/api/objeto', objeto);
app.use('/api/objetokit', objetokit);
app.use('/api/prestado', prestado);
app.use('/api/ubicacion', ubicacion);

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