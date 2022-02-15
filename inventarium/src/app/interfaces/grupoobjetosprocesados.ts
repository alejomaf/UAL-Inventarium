export interface GrupoObjetosProcesados {
    nombre: string,
    imagen: string,
    marca: string,
    modelo: string,
    tipo: number,
    objetos: ObjetosProcesados[],
    kit?: KitProcesado[],
}

export interface ObjetosProcesados {
    mejorasEquipo: string,
    codigo: string,
    fechaAdquisicion: string,
    observaciones: string,
    organizativa: string,
    etiqueta: string,
    Ubicacion_idUbicacion: number,
    configuracion: ConfiguracionProcesada,
}

export interface ConfiguracionProcesada {
    ip: string,
    mac: string,
    boca: string,
    armario: string,
    usuario: string,
    contrasena: string,
}

export interface KitProcesado {
    nombre: string,
    cantidad: number,
    imagen: string,
    observaciones: string
}