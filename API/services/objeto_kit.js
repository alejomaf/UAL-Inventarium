const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(idGrupoObjetos, page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT idObjetoKit, nombre, cantidad, imagen, GrupoObjetos_idGrupoObjetos, observaciones
    FROM objetokit WHERE GrupoObjetos_idGrupoObjetos = ? LIMIT ?,?`,
    [idGrupoObjetos, offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  }
}

async function create(objetokit) {
  const result = await db.query(
    `INSERT INTO objetokit
    (nombre, cantidad, imagen, GrupoObjetos_idGrupoObjetos, observaciones) 
    VALUES 
    (?, ?, ?, ?, ?)`,
    [
      objetokit.nombre, objetokit.cantidad,
      objetokit.imagen, objetokit.GrupoObjetos_idGrupoObjetos,
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
  SET nombre=?, cantidad=?, imagen=?, observaciones=?
  WHERE idObjetoKit=?`,
    [
      objetokit.nombre, objetokit.cantidad, objetokit.imagen, objetokit.observaciones, id
    ]
  );

  let message = 'Error in updating objetokit';

  if (result.affectedRows) {
    message = 'objetokit updated successfully';
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
  remove
}
