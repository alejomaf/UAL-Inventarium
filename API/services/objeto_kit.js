const db = require('./db');
const helper = require('../helper');


async function getMultiple(idGrupoObjetos, page = 1) {
  const rows = await db.query(
    `SELECT idObjetoKit, nombre, cantidad, imagen, GrupoObjetos_idGrupoObjetos, observaciones
    FROM objetokit WHERE GrupoObjetos_idGrupoObjetos = ?`,
    [idGrupoObjetos]
  );
  const data = helper.emptyOrRows(rows);
  return {
    data
  }
}

async function getById(idObjetoKit) {
  const rows = await db.query(
    `SELECT idObjetoKit, nombre, cantidad, imagen, GrupoObjetos_idGrupoObjetos, observaciones
    FROM objetokit WHERE idObjetoKit = ?`,
    [idObjetoKit]
  );
  const data = helper.emptyOrRows(rows);
  return {
    data
  }
}

async function create(objetokit, imagen) {
  const result = await db.query(
    `INSERT INTO objetokit
    (nombre, cantidad, imagen, GrupoObjetos_idGrupoObjetos, observaciones) 
    VALUES 
    (?, ?, ?, ?, ?)`,
    [
      objetokit.nombre, objetokit.cantidad,
      imagen, objetokit.GrupoObjetos_idGrupoObjetos,
      objetokit.observaciones
    ]
  );

  let message = 'Error in creating objetoskit';

  if (result.affectedRows) {
    message = 'objetokit created successfully';
  }

  return { message };
}

async function update(id, objetokit) {
  const result = await db.query(
    `UPDATE objetokit 
  SET nombre=?, cantidad=?, observaciones=?
  WHERE idObjetoKit=?`,
    [
      objetokit.nombre, objetokit.cantidad, objetokit.observaciones, id
    ]
  );

  let message = 'Error in updating objetokit';

  if (result.affectedRows) {
    message = 'objetokit updated successfully';
  }

  return { message };
}

async function updateImage(id, image) {
  const result = await db.query(
    `UPDATE objetokit 
  SET imagen=?
  WHERE idObjetoKit=?`,
    [
      image, id
    ]
  );

  let message = 'Error in updating the image objetokit';

  if (result.affectedRows) {
    message = 'objetokit image updated successfully';
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM objetokit WHERE idObjetoKit=?`,
    [id]
  );

  let message = 'Error in deleting objetokit';

  if (result.affectedRows) {
    message = 'objetokit deleted successfully';
  }

  return { message };
}


module.exports = {
  getMultiple,
  create,
  update,
  remove,
  updateImage,
  getById
}
