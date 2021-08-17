const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(idGrupoObjetos, page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT idObjeto, mejorasEquipo, codigo, disponible, GrupoObjetos_idGrupoObjetos, eliminado, 
    fechaAdquisicion, observaciones, organizativa, etiqueta, Ubicacion_idUbicacion, edificio, planta, ubicacion 
    FROM objeto, ubicacion WHERE GrupoObjetos_idGrupoObjetos = ? AND objeto.Ubicacion_idUbicacion = ubicacion.idUbicacion LIMIT ?,?`,
    [idGrupoObjetos, offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  }
}

async function getMultipleByLocation(Ubicacion_idUbicacion, page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT idObjeto, mejorasEquipo, codigo, disponible, GrupoObjetos_idGrupoObjetos, objeto.eliminado, 
    fechaAdquisicion, observaciones, organizativa, etiqueta, Ubicacion_idUbicacion, nombre
    FROM objeto, grupoobjetos WHERE objeto.Ubicacion_idUbicacion = ? AND GrupoObjetos_idGrupoObjetos = grupoobjetos.idGrupoObjetos LIMIT ?,?`,
    [Ubicacion_idUbicacion, offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  }
}


async function create(objeto) {
  const result = await db.query(
    `INSERT INTO objeto
    (mejorasEquipo, codigo, disponible, GrupoObjetos_idGrupoObjetos, eliminado, fechaAdquisicion, observacione, organizativa, etiqueta, Ubicacion_idUbicacion) 
    VALUES 
    (?, ?, ?, ?, ?, ?, ?)`,
    [
      objeto.mejorasEquipo, objeto.codigo,
      objeto.disponible, objeto.GrupoObjetos_idGrupoObjetos,
      objeto.eliminado, objeto.fechaAdquisicion, objeto.observaciones, objeto.organizativa, objeto.etiqueta, objeto.Ubicacion_idUbicacion
    ]
  );

  let message = 'Error in creating objetos';

  if (result.affectedRows) {
    message = 'objeto created successfully';
  }

  return { message };
}

async function update(id, objeto) {
  const result = await db.query(
    `UPDATE objeto 
  SET mejoraEquipo=?, codigo=?, disponible=?, eliminado=?, fechaAdquisicion=?, observaciones=?, organizativa=?, etiqueta=?, Ubicacion_idUbicacion=?
  WHERE idObjeto=?`,
    [
      objeto.mejorasEquipo, objeto.codigo, objeto.disponible, objeto.eliminado, objeto.fechaAdquisicion, 
      objeto.observaciones, objeto.organizativa, objeto.etiqueta, objeto.Ubicacion_idUbicacion, id
    ]
  );

  let message = 'Error in updating objeto';

  if (result.affectedRows) {
    message = 'objeto updated successfully';
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM objeto WHERE idObjeto=?`,
    [id]
  );

  let message = 'Error in deleting objeto';

  if (result.affectedRows) {
    message = 'objeto deleted successfully';
  }

  return { message };
}

async function getById(idObjeto) {
  const rows = await db.query(
    `SELECT *
    FROM objeto WHERE idObjeto = ?`,
    [idObjeto]
  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }
}


module.exports = {
  getMultiple,
  create,
  update,
  remove,
  getById,
  getMultipleByLocation,
}
