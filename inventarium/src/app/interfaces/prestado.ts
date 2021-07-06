export interface Prestado {
    idPrestado?: number,
    retiradoPor: Text,
    fechaSalida: Date,
    fechaEntrega: Date,
    fechaEstimadaEntrega: Date,
    Usuario_idUsuario: number,
    Objeto_idObjeto: number,
    Objeto_GrupoObjetos_idGrupoObjetos: number,
    Objeto_Ubicacion_idUbicacion: number,
    solicitado: number,
    estado: number,
    Kit_idKit: number
}