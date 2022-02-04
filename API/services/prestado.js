const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(req, page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT date_format(fechaSalida, '%d-%m-%y') as 'fechaSalida', date_format(fechaEntrega, '%d-%m-%y') as 'fechaEntrega', date_format(fechaEstimadaEntrega, '%d-%m-%y') as 'fechaEstimadaEntrega',
    date_format(solicitado, '%d-%m-%y') as 'solicitado', retiradoPor, Usuario_idUsuario, Objeto_idObjeto, estado, nombre, idPrestado
    FROM prestado, usuario WHERE prestado.Usuario_idUsuario = usuario.idUsuario LIMIT ?,?`,
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  }
}

async function getMultipleByObject(idObjeto, page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT date_format(fechaSalida, '%d-%m-%y') as 'fechaSalida', date_format(fechaEntrega, '%d-%m-%y') as 'fechaEntrega', date_format(fechaEstimadaEntrega, '%d-%m-%y') as 'fechaEstimadaEntrega',
    date_format(solicitado, '%d-%m-%y') as 'solicitado', retiradoPor, Usuario_idUsuario, Objeto_idObjeto, estado, nombre, idPrestado
    FROM prestado, usuario WHERE Objeto_idObjeto = ? AND prestado.Usuario_idUsuario = usuario.idUsuario LIMIT ?,?`,
    [idObjeto, offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  }
}

async function getById(idPrestamo) {
  const rows = await db.query(
    `SELECT disponible, date_format(fechaSalida, '%d-%m-%y') as 'fechaSalida', date_format(fechaEntrega, '%d-%m-%y') as 'fechaEntrega', date_format(fechaEstimadaEntrega, '%d-%m-%y') as 'fechaEstimadaEntrega',
    date_format(solicitado, '%d-%m-%y') as 'solicitado', retiradoPor, Usuario_idUsuario, Objeto_idObjeto, estado, usuario.nombre, idPrestado, grupoobjetos.nombre as 'nombre_grupo_objetos'
    FROM prestado, usuario, grupoobjetos, objeto WHERE idPrestado = ? AND prestado.Objeto_idObjeto = objeto.idObjeto AND prestado.Usuario_idUsuario = usuario.idUsuario AND grupoobjetos.idGrupoObjetos = objeto.GrupoObjetos_idGrupoObjetos`,
    [idPrestamo]
  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }
}

async function getByUserId(idUsuario) {
  const rows = await db.query(
    `SELECT disponible, date_format(fechaSalida, '%d-%m-%y') as 'fechaSalida', date_format(fechaEntrega, '%d-%m-%y') as 'fechaEntrega', date_format(fechaEstimadaEntrega, '%d-%m-%y') as 'fechaEstimadaEntrega',
    date_format(solicitado, '%d-%m-%y') as 'solicitado', retiradoPor, Usuario_idUsuario, Objeto_idObjeto, estado, usuario.nombre, idPrestado, grupoobjetos.nombre as 'nombre_grupo_objetos'
    FROM prestado, usuario, grupoobjetos, objeto WHERE prestado.Objeto_idObjeto = objeto.idObjeto AND prestado.Usuario_idUsuario = ? AND prestado.Usuario_idUsuario = usuario.idUsuario AND grupoobjetos.idGrupoObjetos = objeto.GrupoObjetos_idGrupoObjetos`,
    [idUsuario]
  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }
}

async function create(prestado, userId) {
  const result = await db.query(
    `INSERT INTO prestado
    (retiradoPor, fechaEstimadaEntrega, Usuario_idUsuario, Objeto_idObjeto, solicitado, estado) 
    VALUES 
    (?, ?, ?, ?, now(), 0)`,
    [
      prestado.retiradoPor, prestado.fechaEstimadaEntrega, userId, prestado.Objeto_idObjeto
    ]
  );

  let message = 'Error in creating prestado';

  if (result.affectedRows) {
    message = 'prestado created successfully';
  }

  return { message };
}

async function update(id, prestado) {
  const result = await db.query(
    `UPDATE prestado 
    SET retiradoPor=?, fechaSalida=?, fechaEntrega=?, fechaEstimadaEntrega=?, Usuario_idUsuario=?, Objeto_idObjeto=?, Objeto_GrupoObjetos_idGrupoObjetos=?, 
    Objeto_Ubicacion_idUbicacion=?, solicitado=?, estado=?, Kit_idKit=?
    WHERE idPrestado=?`,
    [
      prestado.retiradoPor, prestado.fechaSalida,
      prestado.fechaEntrega, prestado.fechaEstimadaEntrega, prestado.Usuario_idUsuario, prestado.Objeto_idObjeto,
      prestado.Objeto_GrupoObjetos_idGrupoObjetos, prestado.Objeto_Ubicacion_idUbicacion, prestado.solicitado, prestado.estado, prestado.Kit_idKit, id
    ]
  );

  let message = 'Error in updating prestado';

  if (result.affectedRows) {
    message = 'prestado updated successfully';
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM prestado WHERE idPrestado=?`,
    [id]
  );

  let message = 'Error in deleting prestado';

  if (result.affectedRows) {
    message = 'prestado deleted successfully';
  }

  return { message };
}

async function concederPrestamo(id) {
  const result = await db.query(
    `UPDATE prestado 
    SET estado=1, fechaSalida=now()
    WHERE idPrestado=?`,
    [
      id
    ]
  );
  const objeto_query = await db.query(
    `UPDATE objeto SET disponible = 1 WHERE idObjeto = (SELECT idObjeto FROM objeto,prestado WHERE prestado.idPrestado = ? AND objeto.idObjeto = prestado.Objeto_idObjeto)`
    , [
      id
    ]
  );
  const gobjeto_query = await db.query(
    `UPDATE grupoobjetos SET cantidadDisponible = cantidadDisponible-1 WHERE idGrupoObjetos = (SELECT idGrupoObjetos FROM grupoobjetos, objeto, prestado WHERE idGrupoObjetos = objeto.GrupoObjetos_idGrupoObjetos AND objeto.idObjeto = prestado.Objeto_idObjeto AND prestado.idPrestado = ?)`
    , [
      id
    ]
  );
  return result;
}

async function finalizarPrestamo(id) {
  const result = await db.query(
    `UPDATE prestado 
    SET estado=-1, fechaEntrega=now()
    WHERE idPrestado=?`,
    [
      id
    ]
  );
  const objeto_query = await db.query(
    `UPDATE objeto SET disponible = 0 WHERE idObjeto = (SELECT idObjeto FROM objeto,prestado WHERE prestado.idPrestado = ? AND objeto.idObjeto = prestado.Objeto_idObjeto)`
    , [
      id
    ]
  );
  const gobjeto_query = await db.query(
    `UPDATE grupoobjetos SET cantidadDisponible = cantidadDisponible+1 WHERE idGrupoObjetos = (SELECT idGrupoObjetos FROM grupoobjetos, objeto, prestado WHERE idGrupoObjetos = objeto.GrupoObjetos_idGrupoObjetos AND objeto.idObjeto = prestado.Objeto_idObjeto AND prestado.idPrestado = ?)`
    , [
      id
    ]
  );

  return result;
}

async function rechazarPrestamo(id) {
  const result = await db.query(
    `UPDATE prestado 
    SET estado=-2, fechaEntrega=now()
    WHERE idPrestado=?`,
    [
      id
    ]
  );
  return result;
}

async function getActiveLoans() {
  const rows = await db.query(
    `SELECT date_format(fechaSalida, '%d-%m-%y') as 'fechaSalida', date_format(fechaEntrega, '%d-%m-%y') as 'fechaEntrega', date_format(fechaEstimadaEntrega, '%d-%m-%y') as 'fechaEstimadaEntrega',
    date_format(solicitado, '%d-%m-%y') as 'solicitado', retiradoPor, Usuario_idUsuario, Objeto_idObjeto, estado, nombre, idPrestado
    FROM prestado, usuario WHERE prestado.Usuario_idUsuario = usuario.idUsuario AND estado=1`
  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }
}

async function getPendingLoans() {
  const rows = await db.query(
    `SELECT date_format(fechaSalida, '%d-%m-%y') as 'fechaSalida', date_format(fechaEntrega, '%d-%m-%y') as 'fechaEntrega', date_format(fechaEstimadaEntrega, '%d-%m-%y') as 'fechaEstimadaEntrega',
    date_format(solicitado, '%d-%m-%y') as 'solicitado', retiradoPor, Usuario_idUsuario, Objeto_idObjeto, estado, nombre, idPrestado
    FROM prestado, usuario, objeto WHERE prestado.Usuario_idUsuario = usuario.idUsuario AND prestado.Objeto_idObjeto = objeto.idObjeto AND estado=0 AND objeto.disponible=0`
  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }
}

async function getExpiredLoans() {
  const rows = await db.query(
    `SELECT date_format(fechaSalida, '%d-%m-%y') as 'fechaSalida', date_format(fechaEntrega, '%d-%m-%y') as 'fechaEntrega', date_format(fechaEstimadaEntrega, '%d-%m-%y') as 'fechaEstimadaEntrega',
    date_format(solicitado, '%d-%m-%y') as 'solicitado', retiradoPor, Usuario_idUsuario, Objeto_idObjeto, estado, nombre, idPrestado
    FROM prestado, usuario WHERE prestado.Usuario_idUsuario = usuario.idUsuario AND fechaEstimadaEntrega < now() AND estado=1`
  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }
}


module.exports = {
  getMultiple,
  getMultipleByObject,
  create,
  update,
  remove,
  concederPrestamo,
  finalizarPrestamo,
  rechazarPrestamo,
  getById,
  getActiveLoans,
  getExpiredLoans,
  getPendingLoans,
  getByUserId,
}
