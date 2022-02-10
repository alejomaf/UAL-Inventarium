const express = require('express');
const router = express.Router();
const usuarios = require('../services/usuario');
const bcrypt = require('bcryptjs');
const jwt = require("jwt-simple");
const moment = require("moment");
const middleware = require('./middleware');
const transporter = require('../mails/mailer');


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

router.post('/request-password', async function (req, res, next) {
  const usuario = await usuarios.getByEmail(req.fields.email);
  console.log("Entra")
  if (usuario === undefined) {
    // User didn't found
    console.log("Usuario no encontrado")
  } else {
    console.log("Correo encontrado");
    var hash = createToken(usuario);
    await transporter.recuperar_contrasena(usuario.correoElectronico, "http://" + process.env.HOST + "/password-new-set/" + hash, usuario.nombre);
  }
  return res.json({ successfull: "Send or not" });
});

router.post('/recover-password', async function (req, res, next) {
  if (!req.fields.token && !req.fields.newpassword)
    return res.json({
      error: "You must include the data"
    });

  const token = req.fields.token;
  let payload = null
  try {
    payload = jwt.decode(token, process.env.TOKEN_KEY);
  } catch (err) {
    return res.json({
      error: "Invalid token"
    });
  }

  if (moment().unix() > payload.expiresAt) {
    return res.json({ error: "Expired token" });
  };

  var password = bcrypt.hashSync(req.fields.newpassword, 10);
  return res.json(await usuarios.updatePassword(payload.userId, password));
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

router.post('/confirmar-registro/:token/:number/:id', async function (req, res, next) {
  try {
    const usuario = await usuarios.getById(req.params.id);
    if (usuario.rango == 0 || usuario.rango == -2) {
      res.json({
        error: "200"
      });
      return;
    }
    if (usuario.telefono != req.params.number) {
      res.json({
        error: "201"
      });
      return;
    }
    if (!bcrypt.compareSync(req.params.number, req.params.token)) {
      res.json({
        error: "Error, email or password not found"
      });
      return;
    }//ENCRIPTACIÓN DE LA CONTRASEÑA ACTIVADA
    res.json(await usuarios.confirmarRegistro(req.params.id));
  } catch (err) {
    console.error(`Error while creating usuario`, err.message);
    next(err);
  }
});



router.use(middleware.checkToken);




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

router.get('/mainUser', (req, res) => {
  usuarios.getById(req.userId)
    .then(rows => {
      res.json(rows);
    })
    .catch(err => console.log(err));
});


/* GET usuario. */
router.get('/requests', async function (req, res, next) {
  try {
    res.json(await usuarios.getUserRequests(req.query.page));
  } catch (err) {
    console.error(`Error while getting usuarios `, err.message);
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

/* Change password. */
router.post('/change-password', async function (req, res, next) {
  const usuario = await usuarios.getById(req.userId);

  if (usuario === undefined) {
    res.json({
      error: "Usuario no encontrado"
    });
    return;
  } else {
    if (!bcrypt.compareSync(req.fields.oldpass, usuario.contrasena)) { //req.fields.contrasena != usuario.contrasena
      res.json({
        error: "Contraseña incorrecta"
      });
    } else {
      try {
        req.fields.newpass = bcrypt.hashSync(req.fields.newpass, 10); //ENCRIPTACIÓN DE LA CONTRASEÑA ACTIVADA
        await usuarios.cambiarContrasena(req.userId, req.fields.newpass);
      } catch (err) {
        res.json({ error: err.message });
        return;
      }
      res.json({
        done: "Cambio de contraseña realizado"
      });
    }
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