const express = require('express');
const router = express.Router();
const objetokit = require('../services/objeto_kit');
const path = require('path');
const fs = require('fs');
const middleware = require('./middleware');
router.use(middleware.checkToken);


/* GET objetokit. */
router.get('/:id', async function (req, res, next) {
  try {
    res.json(await objetokit.getMultiple(req.params.id, req.query.page));
  } catch (err) {
    console.error(`Error while getting objetokit `, err.message);
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
      const uploadFolder = path.join(__dirname, "..", "images", "kits");
      try {
        // renames the file in the directory
        fs.renameSync(file.path, path.join(uploadFolder, fileName));
      } catch (error) {
        console.log(error);
      }

    } else return;

    //Consulta post en la base de datos
    res.json(await objetokit.create(req.fields, time));
  } catch (err) {
    console.error(`Error while creating objetokit`, err.message);
    next(err);
  }
});

router.put('/:id', async function (req, res, next) {
  try {
    res.json(await objetokit.update(req.params.id, req.fields));
  } catch (err) {
    console.error(`Error while updating objetokit`, err.message);
    next(err);
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    res.json(await objetokit.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting objetokit`, err.message);
    next(err);
  }
});

module.exports = router;