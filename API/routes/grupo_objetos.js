const express = require('express');
const router = express.Router();
const path = require('path');
const group_of_objects = require('../services/grupo_objetos');
const middleware = require('./middleware');
const fs = require('fs');
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

const isFileValid = (file) => {
  const type = file.type.split("/").pop();
  const validTypes = ["jpg", "jpeg", "png"];
  if (validTypes.indexOf(type) === -1) {
    return false;
  }
  return true;
};

router.post('/', async function (req, res, next) {
  try {
    time = Date.now();

    files = req.files

    // Check if multiple files or a single file
    if (!files.length) {
      //Single file
      const file = files.image;
      // checks if the file is valid
      const isValid = isFileValid(file);
      // creates a valid name by removing spaces
      const fileName = time + ".jpg";

      if (!isValid) {
        // throes error if file isn't valid
        return res.status(400).json({
          status: "Fail",
          message: "The file type is not a valid type",
        });
      }
      const uploadFolder = path.join(__dirname, "..", "images", "group_of_objects");
      try {
        // renames the file in the directory
        fs.renameSync(file.path, path.join(uploadFolder, fileName));
      } catch (error) {
        console.log(error);
      }

    } else return;

    //Consulta post en la base de datos
    res.json(await group_of_objects.create(req.fields, time));


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