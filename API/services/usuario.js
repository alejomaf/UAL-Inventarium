const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT idUsuario, nombre, contrasena, correoElectronico, rango, departamento, telefono 
    FROM usuario LIMIT ?,?`, 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function getByEmail(correoElectronico){
  const usuario = await db.query(
    `SELECT idUsuario, nombre, correoElectronico, contrasena, rango, departamento, telefono 
    FROM usuario WHERE correoElectronico = ?`,[correoElectronico]
  );
  return usuario[0];
}

async function getById(idUsuario){
  const usuario = await db.query(
    `SELECT idUsuario, nombre, correoElectronico, contrasena, rango, departamento, telefono
    FROM usuario WHERE idUsuario = ?`,[idUsuario]
  );
  return usuario[0];
}

async function create(usuario){
  const result = await db.query(
    `INSERT INTO usuario
    (nombre, correoElectronico, contrasena, rango, departamento, telefono) 
    VALUES 
    (?, ?, ?)`, 
    [
      usuario.nombre, usuario.correoElectronico,
      usuario.contrasena, usuario.rango, usuario.departamento, usuario.telefono
    ]
  );

  let message = 'Error in creating users';

  if (result.affectedRows) {
    message = 'usuario created successfully';
  }

  return {message};
}

async function update(id, usuario){
  const result = await db.query(
    `UPDATE usuario 
    SET nombre=?, contrasena=?, correoElectronico=?, rango=?, departamento=?, telefono=?
    WHERE idUsuario=?`, 
    [
      usuario.nombre, usuario.contrasena,
      usuario.correoElectronico, usuario.rango, usuario.departamento, usuario.telefono
    ]
  );

  let message = 'Error in updating usuario';

  if (result.affectedRows) {
    message = 'usuario updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM usuario WHERE idUsuario=?`, 
    [id]
  );

  let message = 'Error in deleting usuario';

  if (result.affectedRows) {
    message = 'usuario deleted successfully';
  }

  return {message};
}


module.exports = {
  getMultiple,
  create,
  update,
  remove,
  getByEmail,
  getById
}
