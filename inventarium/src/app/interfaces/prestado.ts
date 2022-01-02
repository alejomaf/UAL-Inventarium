export interface Prestado {
    idPrestado?: number,
    retiradoPor: String,
    fechaSalida: Date,
    fechaEntrega: Date,
    fechaEstimadaEntrega: Date,
    Usuario_idUsuario: number,
    Objeto_idObjeto: number,
    Objeto_GrupoObjetos_idGrupoObjetos: number,
    Objeto_Ubicacion_idUbicacion: number,
    solicitado: Date,
    estado: number,
    nombre: String,
}