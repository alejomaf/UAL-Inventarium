const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const group_of_objects = require('../services/grupo_objetos');
const middleware = require('./middleware');
//const Resize = require('./resize');
router.use(middleware.checkToken);


/* GET group_of_objects. */
router.get('/', async function (req, res, next) {
  try {
    req.User_idUser = req.userId;
    res.json(await group_of_objects.getMultiple(req, req.query.page));
  } catch (err) {
    console.error(`Error while getting group_of_objects `, err.message);
    next(err);
  }
});

router.get('/id/:id', async function (req, res, next) {
  try {
    req.User_idUser = req.userId;
    res.json(await group_of_objects.getById(req.params.id, req.query.page));
  } catch (err) {
    console.error(`Error while getting group_of_objects `, err.message);
    next(err);
  }
});

router.get('/type/:id', async function (req, res, next) {
  try {
    req.User_idUser = req.userId;
    res.json(await group_of_objects.getByType(req.params.id, req.query.page));
  } catch (err) {
    console.error(`Error while getting group_of_objects `, err.message);
    next(err);
  }
});

var Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/group_of_objects')
  },
  filename: function (req, file, cb) {
    cb(null, time + '.jpg')
  }
})
var upload = multer({ storage: Storage }).array('image', 1)
var time;

router.post('/', async function (req, res, next) {
  try {
    time = Date.now();
    upload(req, res, err => {
      if (err) {
        res.send('The image could not be upload');
      } else {
        res.json(group_of_objects.create(req.body, req.userId, time));
      }
    });
  } catch (err) {
    console.error(`Error while creating group of objects`, err.message);
    next(err);
  }
});

router.put('/:id', async function (req, res, next) {
  try {
    res.json(await group_of_objects.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating group of objects`, err.message);
    next(err);
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    res.json(await group_of_objects.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting group of objects`, err.message);
    next(err);
  }
});

module.exports = router;