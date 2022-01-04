const express = require('express');
const router = express.Router();
const objeto = require('../services/objeto');
const middleware = require('./middleware');


router.use(middleware.checkToken);

router.get('/configs', async function (req, res, next) {
  try {
    res.json(await objeto.getMultipleWithConfig());
  } catch (err) {
    console.error(`Error while getting objeto `, err.message);
    next(err);
  }
});

/* GET objeto. */
router.get('/:id', async function (req, res, next) {
  try {
    res.json(await objeto.getMultiple(req.params.id, req.query.page));
  } catch (err) {
    console.error(`Error while getting objeto `, err.message);
    next(err);
  }
});

router.get('/id/:id', async function (req, res, next) {
  try {
    res.json(await objeto.getById(req.params.id, req.query.page));
  } catch (err) {
    console.error(`Error while getting objeto `, err.message);
    next(err);
  }
});

router.get('/location-id/:id', async function (req, res, next) {
  try {
    res.json(await objeto.getMultipleByLocation(req.params.id, req.query.page));
  } catch (err) {
    console.error(`Error while getting objeto `, err.message);
    next(err);
  }
});

router.post('/:id', async function (req, res, next) {
  try {
    res.json(await objeto.create(req.fields, req.params.id));
  } catch (err) {
    console.error(`Error while creating object`, err.message);
    next(err);
  }
});

router.put('/:id', async function (req, res, next) {
  try {
    res.json(await objeto.update(req.params.id, req.fields));
  } catch (err) {
    console.error(`Error while updating object`, err.message);
    next(err);
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    res.json(await objeto.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting object`, err.message);
    next(err);
  }
});

module.exports = router;