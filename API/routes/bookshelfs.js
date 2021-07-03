const express = require('express');
const router = express.Router();
const bookshelfs = require('../services/bookshelfs');
const middleware = require('./middleware');
router.use(middleware.checkToken);


/* GET bookshelfs. */
router.get('/', async function(req, res, next) {
  try {
    req.User_idUser = req.userId;
    res.json(await bookshelfs.getMultiple(req, req.query.page));
  } catch (err) {
    console.error(`Error while getting bookshelfs `, err.message);
    next(err);
  }
});

router.post('/', async function(req, res, next) {
  try {
    res.json(await bookshelfs.create(req.body, req.userId));
  } catch (err) {
    console.error(`Error while creating bookshelf`, err.message);
    next(err);
  }
});

router.put('/:id', async function(req, res, next) {
  try {
    res.json(await bookshelfs.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating bookshelf`, err.message);
    next(err);
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await bookshelfs.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting bookshelf`, err.message);
    next(err);
  }
});

module.exports = router;