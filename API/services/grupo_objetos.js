const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(req, page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT idGrupoObjetos, cantidad, nombre, imagen, marca, modelo, cantidadDisponible, tipo, eliminado 
    FROM grupoobjetos WHERE eliminado = 0 LIMIT ?,?`,
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  }
}

async function create(grupoobjetos, name_of_image) {
  const result = await db.query(
    `INSERT INTO grupoobjetos
    (nombre, imagen, marca, modelo, tipo) 
    VALUES 
    (?, ?, ?, ?, ?)`,
    [
      grupoobjetos.nombre || "undefined",
      name_of_image || "", grupoobjetos.marca || "", grupoobjetos.modelo || "",
      grupoobjetos.tipo || -1
    ]
  );

  let message = 'Error in creating grupoobjetos';

  if (result.affectedRows) {
    message = 'grupoobjetos created successfully';
  }

  return { message };
}

async function update(id, grupoobjetos, imagen) {
  const result = await db.query(
    `UPDATE grupoobjetos 
    SET cantidad=?, nombre=?, imagen=?, marca=?, modelo=?, cantidadDisponible=?, tipo=?, eliminado=?
    WHERE idGrupoObjetos=?`,
    [
      grupoobjetos.cantidad, grupoobjetos.nombre,
      grupoobjetos.imagen, grupoobjetos.marca, grupoobjetos.modelo, grupoobjetos.cantidadDisponible,
      grupoobjetos.tipo, grupoobjetos.eliminado, id
    ]
  );

  let message = 'Error in updating grupoobjetos';

  if (result.affectedRows) {
    message = 'grupoobjetos updated successfully';
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM grupoobjetos WHERE idGrupoObjetos=?`,
    [id]
  );

  let message = 'Error in deleting grupoobjetos';

  if (result.affectedRows) {
    message = 'grupoobjetos deleted successfully';
  }

  return { message };
}

async function getById(idGrupoObjetos) {
  const rows = await db.query(
    `SELECT *
    FROM grupoobjetos WHERE idGrupoObjetos = ?`,
    [idGrupoObjetos]
  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }
}

async function getByType(req, page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT idGrupoObjetos, cantidad, nombre, imagen, marca, modelo, cantidadDisponible, tipo, eliminado 
    FROM grupoobjetos WHERE eliminado = 0 AND tipo = ? LIMIT ?,?`,
    [req, offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  }
}

module.exports = {
  getMultiple,
  create,
  update,
  remove,
  getById,
  getByType,
}
