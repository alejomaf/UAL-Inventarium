const express = require('express');
const router = express.Router();
const objetokit = require('../services/objeto_kit');
const path = require('path');
const fs = require('fs');
const request = require('request');
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

var download = async function (uri, filename, callback) {
  request.head(uri, function (err, res, body) {
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

async function uploadingFile(files, name, id) {
  // Check if multiple files or a single file
  if (!files.length) {
    //Single file
    const file = files.image;
    // checks if the file is valid
    const isValid = isFileValid(file);
    // creates a valid name by removing spaces
    const fileName = name + ".jpg";

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
      fs.copyFile(file.path, path.join(uploadFolder, fileName), function (err) {
        if (err) throw err;
      });
      await objetokit.updateImage(id, name);
    } catch (error) {
      console.log(error);
    }

  } else return;
}

async function uploadFileFromInternet(file, name, id) {
  parts_of_file = file.split("/");
  id_file = "https://drive.google.com/uc?export=download&id=" + parts_of_file[parts_of_file.length - 2]
  await download(id_file, '__dirname/../images/group_of_objects/' + name + ".jpg", function () { console.log("Upload from internet successfully") });
}

router.post('/', async function (req, res, next) {
  try {
    time = Date.now();

    if (req.files.size != undefined) {
      files = req.files
      await uploadingFile(files, time, req.fields.GrupoObjetos_idGrupoObjetos);
    } else if (req.fields.image)
      await uploadFileFromInternet(req.fields.image, time, req.fields.GrupoObjetos_idGrupoObjetos)

    //Consulta post en la base de datos
    res.json(await objetokit.create(req.fields, time));

  } catch (err) {
    console.error(`Error while creating objetokit`, err.message);
    next(err);
  }
});

router.put('/:id', async function (req, res, next) {
  try {
    let kit = (await objetokit.getById(req.params.id)).data[0];
    if (kit === undefined) {
      res.json({ 'error': 'Group of object dont exist' });
      return;
    }

    if ('image' in req.files) {

      if (kit.imagen != null) {
        const path = '__dirname/../images/kits/' + kit.imagen + '.jpg';
        try {
          fs.exists(path, function (exists) {
            if (exists) {
              //Show in green
              console.log('File exists. Deleting now ...');
              fs.unlinkSync(path);
            } else {
              //Show in red
              console.log('File not found, so not deleting.');
            }
          });
        } catch (err) {
          console.error(err);
        }
      }

      time = Date.now();
      files = req.files

      await uploadingFile(files, time, req.params.id);
    }

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