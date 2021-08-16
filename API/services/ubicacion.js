const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getById(idUbicacion) {
  const rows = await db.query(
    `SELECT idUbicacion, ubicacion, planta, edificio
    FROM ubicacion WHERE idUbicacion = ?`,
    [idUbicacion]
  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }
}

async function getMultiple(req, page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM ubicacion LIMIT ?,?`,
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  }
}

async function create(ubicacion) {
  const result = await db.query(
    `INSERT INTO ubicacion
    (ubicacion, planta, edificio) 
    VALUES 
    (?, ?, ?)`,
    [
      ubicacion.ubicacion, ubicacion.planta,
      ubicacion.edificio
    ]
  );

  let message = 'Error in creating location';

  if (result.affectedRows) {
    message = 'Location created succesfully';
  }

  return { message };
}

async function update(id, ubicacion) {
    const result = await db.query(
      `UPDATE ubicacion
    SET ubicacion=?, planta=?, edificio=?
    WHERE idUbicacion=?`,
      [
        ubicacion.ubicacion, ubicacion.planta, ubicacion.edificio, id
      ]
    );

  let message = 'Error in updating location';

  if (result.affectedRows) {
    message = 'Location updated successfully';
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM ubicacion WHERE idUbicacion=?`,
    [id]
  );

  let message = 'Error in deleting location';

  if (result.affectedRows) {
    message = 'Location deleted successfully';
  }

  return { message };
}


module.exports = {
  getMultiple,
  getById,
  create,
  update,
  remove
}
