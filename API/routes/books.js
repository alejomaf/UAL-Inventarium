const express = require('express');
const router = express.Router();
const books = require('../services/books');
const middleware = require('./middleware');
router.use(middleware.checkToken);


/* GET books. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await books.getMultiple(req.query.idBookshelf, req.query.page));
  } catch (err) {
    console.error(`Error while getting books `, err.message);
    next(err);
  }
});

router.post('/', async function(req, res, next) {
  try {
    res.json(await books.create(req.body));
  } catch (err) {
    console.error(`Error while creating book`, err.message);
    next(err);
  }
});

router.put('/:id', async function(req, res, next) {
  try {
    res.json(await books.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating book`, err.message);
    next(err);
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await books.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting book`, err.message);
    next(err);
  }
});

module.exports = router;