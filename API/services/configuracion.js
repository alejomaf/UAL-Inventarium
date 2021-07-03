const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getById(idObjeto) {
  const rows = await db.query(
    `SELECT ip, mac, boca, armario, usuario, contrasena
    FROM configuracion WHERE Objeto_idObjeto = ?`,
    [idObjeto]
  );
  const data = helper.emptyOrRows(rows);

  return {
    data,
    meta
  }
}

async function create(configuracion) {
  const result = await db.query(
    `INSERT INTO Configuracion
    (ip, mac, boca, armario, usuario, contrasena, Objeto_idObjeto) 
    VALUES 
    (?, ?, ?, ?, ?, ?, ?)`,
    [
      configuracion.ip, configuracion.mac,
      configuracion.boca, configuracion.armario,
      configuracion.usuario, configuracion.contrasena, configuracion.Objeto_idObjeto
    ]
  );

  let message = 'Error in creating config';

  if (result.affectedRows) {
    message = 'Config created succesfully';
  }

  return { message };
}

async function update(id, configuracion) {
    const result = await db.query(
      `UPDATE configuracion
    SET ip=?, mac=?, boca=?, armario=?, usuario=?, contrasena=?
    WHERE idConfiguracion=?`,
      [
        configuracion.ip, configuracion.mac, configuracion.boca, configuracion.armario, configuracion.usuario, configuracion.contrasena, id
      ]
    );

  let message = 'Error in updating config';

  if (result.affectedRows) {
    message = 'Config updated successfully';
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM configuracion WHERE idConfiguracion=?`,
    [id]
  );

  let message = 'Error in deleting configuracion';

  if (result.affectedRows) {
    message = 'Config deleted successfully';
  }

  return { message };
}


module.exports = {
  getById,
  create,
  update,
  remove
}
