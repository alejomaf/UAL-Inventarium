const express = require('express');
const router = express.Router();
const prestado = require('../services/prestado');
const middleware = require('./middleware');
router.use(middleware.checkToken);


/* GET prestado. */
router.get('/', async function(req, res, next) {
  try {
    req.User_idUser = req.userId;
    res.json(await prestado.getMultiple(req, req.query.page));
  } catch (err) {
    console.error(`Error while getting prestado `, err.message);
    next(err);
  }
});

router.post('/', async function(req, res, next) {
  try {
    res.json(await prestado.create(req.body, req.userId));
  } catch (err) {
    console.error(`Error while creating prestado`, err.message);
    next(err);
  }
});

router.put('/:id', async function(req, res, next) {
  try {
    res.json(await prestado.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating prestado`, err.message);
    next(err);
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await prestado.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting prestado`, err.message);
    next(err);
  }
});

module.exports = router;