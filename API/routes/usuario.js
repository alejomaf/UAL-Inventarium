const express = require('express');
const router = express.Router();
const usuarios = require('../services/usuario');
const bcrypt = require('bcryptjs');
const jwt = require("jwt-simple");
const moment = require("moment");
const middleware = require('./middleware');




router.post('/login', async function (req, res, next) {
  const usuario = await usuarios.getByEmail(req.fields.correoElectronico);

  if (usuario === undefined) {
    res.json({
      error: "Error, email or password not found"
    });
  } else {
    if (!bcrypt.compareSync(req.fields.contrasena, usuario.contrasena)) { //req.fields.contrasena != usuario.contrasena
      res.json({
        error: "Error, email or password not found"
      });
    } else {
      res.json({
        successfull: createToken(usuario),
        done: "Login correct"
      });
    }
  }
});

const createToken = (usuario) => {
  let payload = {
    userId: usuario.idUsuario,
    createdAt: moment().unix(),
    expiresAt: moment().add(1, 'day').unix()
  }
  return jwt.encode(payload, process.env.TOKEN_KEY);
};

router.post('/', async function (req, res, next) {
  try {
    req.fields.contrasena = bcrypt.hashSync(req.fields.contrasena, 10); //ENCRIPTACIÓN DE LA CONTRASEÑA ACTIVADA
    res.json(await usuarios.create(req.fields));
  } catch (err) {
    console.error(`Error while creating usuario`, err.message);
    next(err);
  }
});


router.use(middleware.checkToken);


router.get('/mainUser', (req, res) => {
  usuarios.getById(req.userId)
    .then(rows => {
      res.json(rows);
    })
    .catch(err => console.log(err));
});

router.post('/action/:userId/:id', async function (req, res, next) {
  try {
    tipo_consulta = req.params.id;
    if (tipo_consulta == 0) {
      res.json(await usuarios.darDeBaja(req.params.userId));
    } else if (tipo_consulta == 1) {
      res.json(await usuarios.darDeAlta(req.params.userId));
    } else {
      res.json(await usuarios.convertirEnTecnico(req.params.userId));
    }

  } catch (err) {
    console.error(`Error while creating usuario`, err.message);
    next(err);
  }
});

/* GET usuario. */
router.get('/', async function (req, res, next) {
  try {
    res.json(await usuarios.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting usuario `, err.message);
    next(err);
  }
});

/* GET usuario. */
router.get('/:id', async function (req, res, next) {
  try {
    res.json(await usuarios.getById(req.params.id));
  } catch (err) {
    console.error(`Error while getting usuario `, err.message);
    next(err);
  }
});


router.put('/:id', async function (req, res, next) {
  try {
    req.body.password = bcrypt.hashSync(req.fields.password, 10);
    res.json(await usuarios.update(req.params.id, req.fields));
  } catch (err) {
    console.error(`Error while updating usuario`, err.message);
    next(err);
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    res.json(await usuarios.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting usuario`, err.message);
    next(err);
  }
});

module.exports = router;