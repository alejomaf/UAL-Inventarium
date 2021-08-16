const express = require('express');
const router = express.Router();
const location = require('../services/ubicacion');
const middleware = require('./middleware');

router.use(middleware.checkToken);


/* GET location. */
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await location.getById(req.params.id, req.query.page));
  } catch (err) {
    console.error(`Error while getting config `, err.message);
    next(err);
  }
});

router.get('/', async function(req, res, next) {
  try {
    res.json(await location.getMultiple(req.params, req.query.page));
  } catch (err) {
    console.error(`Error while getting config `, err.message);
    next(err);
  }
});

router.post('/', async function(req, res, next) {
  try {
    res.json(await location.create(req.body));
  } catch (err) {
    console.error(`Error while creating config`, err.message);
    next(err);
  }
});

router.put('/:id', async function(req, res, next) {
  try {
    res.json(await location.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating config`, err.message);
    next(err);
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await location.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting config`, err.message);
    next(err);
  }
});

module.exports = router;