const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const bcrypt = require('bcryptjs');
const transporter = require('../mails/mailer');

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT idUsuario, nombre, contrasena, correoElectronico, rango, departamento, telefono 
    FROM usuario LIMIT ?,?`,
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  }
}

async function getByEmail(correoElectronico) {
  const usuario = await db.query(
    `SELECT idUsuario, nombre, correoElectronico, contrasena, rango, departamento, telefono 
    FROM usuario WHERE correoElectronico = ?`, [correoElectronico]
  );
  return usuario[0];
}

async function getById(idUsuario) {
  const usuario = await db.query(
    `SELECT idUsuario, nombre, correoElectronico, contrasena, rango, departamento, telefono
    FROM usuario WHERE idUsuario = ?`, [idUsuario]
  );
  return usuario[0];
}

async function create(usuario) {
  const usuario_repetido = await this.getByEmail(usuario.correoElectronico);

  if (!(usuario_repetido === undefined)) {
    let error = "El usuario registrado ya existe";
    return { error };
  }

  const result = await db.query(
    `INSERT INTO usuario
    (nombre, correoElectronico, contrasena, rango, departamento, telefono) 
    VALUES 
    (?, ?, ?, ?, ?, ?)`,
    [
      usuario.nombre, usuario.correoElectronico,
      usuario.contrasena, usuario.rango || -2, usuario.departamento || 0, usuario.telefono
    ]
  );

  let message = 'Error in creating users';

  if (result.affectedRows) {
    message = 'usuario created successfully';
    await transporter.registro_creado(usuario.correoElectronico, "http://" + process.env.HOST + "/register-confirmed/" + result.insertId + '/' + usuario.telefono + '/' + bcrypt.hashSync(usuario.telefono, 3), usuario.nombre);
  }

  return { message };
}

async function update(id, usuario) {
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

  return { message };
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM usuario WHERE idUsuario=?`,
    [id]
  );

  let message = 'Error in deleting usuario';

  if (result.affectedRows) {
    message = 'usuario deleted successfully';
  }

  return { message };
}

async function administrador() {
  const usuario = await this.getById(1);

  if (usuario === undefined) {
    contrasena = bcrypt.hashSync("admin", 10)
    await create({ "nombre": "admin", "contrasena": contrasena, "correoElectronico": "ualinventarium@gmail.com", "rango": "0", "departamento": "0", "telefono": "674915779" });
  }
}

async function confirmarRegistro(idUsuario) {
  const result = await db.query(
    `UPDATE usuario 
    SET rango=-1
    WHERE idUsuario=?`,
    [
      idUsuario
    ]
  );
  let message = 'Error in updating usuario';
  if (result.affectedRows) {
    message = 'usuario updated successfully';
  }
  return { message, result };
}

async function darDeAlta(idUsuario) {
  const result = await db.query(
    `UPDATE usuario 
    SET rango=1
    WHERE idUsuario=?`,
    [
      idUsuario
    ]
  );
  let message = 'Error in updating usuario';
  if (result.affectedRows) {
    message = 'usuario updated successfully';
  }
  return { message, result };
}

async function darDeBaja(idUsuario) {
  const result = await db.query(
    `UPDATE usuario 
    SET rango=-2
    WHERE idUsuario=?`,
    [
      idUsuario
    ]
  );
  let message = 'Error in updating usuario';
  if (result.affectedRows) {
    message = 'usuario updated successfully';
  }
  return { message, result };
}

async function convertirEnTecnico(idUsuario) {
  const result = await db.query(
    `UPDATE usuario 
    SET rango=0
    WHERE idUsuario=?`,
    [
      idUsuario
    ]
  );
  let message = 'Error in updating usuario';
  if (result.affectedRows) {
    message = 'usuario updated successfully';
  }
  return { message, result };
}



module.exports = {
  getMultiple,
  create,
  update,
  remove,
  getByEmail,
  getById,
  administrador,
  darDeAlta,
  darDeBaja,
  convertirEnTecnico,
  confirmarRegistro,
}
