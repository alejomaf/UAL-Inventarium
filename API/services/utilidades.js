const db = require('./db');
const helper = require('../helper');
const config = require('../config');


async function addObjectRoutine(idGrupoObjeto) {
    const result = await db.query('UPDATE grupoobjetos SET cantidad = cantidad + 1, cantidadDisponible = cantidadDisponible + 1 WHERE idGrupoObjetos = ' + idGrupoObjeto);
    if (result.affectedRows) {
        return true;
    }
}

async function deleteObjectRoutine(idObjeto) {
    const result = await db.query('UPDATE grupoobjetos SET cantidad = cantidad - 1, cantidadDisponible = cantidadDisponible - 1 WHERE idGrupoObjetos = (SELECT GrupoObjetos_idGrupoObjetos FROM objeto WHERE idObjeto =' + idObjeto + ')');
    if (result.affectedRows) {
        return true;
    }
}

module.exports = {
    addObjectRoutine,
    deleteObjectRoutine
}