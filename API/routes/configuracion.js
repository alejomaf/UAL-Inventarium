const express = require('express');
const router = express.Router();
const configuracion = require('../services/configuracion');
const middleware = require('./middleware');

router.use(middleware.checkToken);


/* GET configuracion. */
router.get('/:id', async function (req, res, next) {
  try {
    res.json(await configuracion.getById(req.params.id));
  } catch (err) {
    console.error(`Error while getting config `, err.message);
    next(err);
  }
});

router.post('/', async function (req, res, next) {
  try {
    res.json(await configuracion.create(req.fields));
  } catch (err) {
    console.error(`Error while creating config`, err.message);
    next(err);
  }
});

router.put('/:id', async function (req, res, next) {
  try {
    res.json(await configuracion.update(req.params.id, req.fields));
  } catch (err) {
    console.error(`Error while updating config`, err.message);
    next(err);
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    res.json(await configuracion.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting config`, err.message);
    next(err);
  }
});

module.exports = router;