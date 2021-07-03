const express = require('express');
const router = express.Router();
const reminders = require('../services/reminders');
const middleware = require('./middleware');
router.use(middleware.checkToken);


/* GET reminders. */
router.get('/', async function(req, res, next) {
  try {
    req.User_idUser = req.userId;
    res.json(await reminders.getMultiple(req, req.query.page));
  } catch (err) {
    console.error(`Error while getting reminders `, err.message);
    next(err);
  }
});

router.post('/', async function(req, res, next) {
  try {
    res.json(await reminders.create(req.userId, req.body));
  } catch (err) {
    console.error(`Error while creating reminder`, err.message);
    next(err);
  }
});

router.put('/:id', async function(req, res, next) {
  try {
    res.json(await reminders.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating reminder`, err.message);
    next(err);
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await reminders.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting reminder`, err.message);
    next(err);
  }
});

module.exports = router;