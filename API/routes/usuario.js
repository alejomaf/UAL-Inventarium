const express = require('express');
const router = express.Router();
const usuario = require('../services/usuario');
const bcrypt = require('bcryptjs');
const jwt = require("jwt-simple");
const moment = require("moment");
const middleware = require('./middleware');




router.post('/login', async function (req, res, next) {
  const usuario = await usuario.getByEmail(req.body.correoElectronico);
  if (usuario === undefined) {
    res.json({
      error: "Error, email or password not found"
    });
  } else {
    if(!bcrypt.compareSync(req.body.password, usuario.contrasena)){
      res.json({
        error: "Error, email or password not found"
      });
    }else{
      res.json({
        successfull: createToken(usuario),
        done: "Login correct"
      });
    }
  }
  res.json({
    error: "Error, email or password not found"
  });
});

const createToken = (usuario) => {
  let payload = {
    userId: usuario.idUsuario,
    createdAt: moment().unix(),
    expiresAt: moment().add(1, 'day').unix()
  }
  return jwt.encode(payload,process.env.TOKEN_KEY);
};

router.post('/', async function (req, res, next) {
  try {
    //req.body.password = bcrypt.hashSync(req.body.password, 10); ENCRIPTACIÓN DE LA CONTRASEÑA DESACTIVADA
    res.json(await usuario.create(req.body));
  } catch (err) {
    console.error(`Error while creating usuario`, err.message);
    next(err);
  }
});


router.use(middleware.checkToken);



/* GET usuario. */
router.get('/', async function (req, res, next) {
  try {
    res.json(await usuario.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting usuario `, err.message);
    next(err);
  }
});




router.get("/mainUser", (req, res) => {
  usuario.getById(req.userId)
  .then(rows => {
    res.json(rows);
  })
  .catch(err => console.log(err));
});

router.put('/:id', async function (req, res, next) {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    res.json(await usuario.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating usuario`, err.message);
    next(err);
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    res.json(await usuario.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting usuario`, err.message);
    next(err);
  }
});

module.exports = router;