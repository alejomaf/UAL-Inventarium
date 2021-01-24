var objetoT;
var nombreGrupoObjeto;
var grupoObjeto;

var busquedaO = { GrupoObjetos_idGrupoObjetos: aux };

async function cargarObjetos() {
  if ("GrupoObjetos_idGrupoObjetos" in busquedaO) {
    await cargarGrupoObjeto();
    if (grupoObjeto.tipo == "2") {

      //Es un kit el que estoy cargando

      objetosKit = await realizarConsulta("apis/busqueda/buscarObjetoKit.php", busquedaO);

      if (objetosKit == null) {
        aquiNoHayNada($("#contenedorObjetosKit"));
      } else {
        for (z = 0; z < objetosKit.length; z++) {
          await anadirObjetoKit(objetosKit[z]);
        }
      }
      kit = await realizarConsulta("apis/busqueda/buscarKit.php", busquedaO);

      if (kit == null) {
        aquiNoHayNada($("#insideContainer"));
      } else {
        for (z = 0; z < kit.length; z++) {
          await anadirKit(kit[z]);
        }
      }

      return;
    }
  }

  objetos = await realizarConsulta("apis/busqueda/buscarObjeto.php", busquedaO);

  if (objetos == null) {
    aquiNoHayNada($("#insideContainer"));
    return;
  }
  for (z = 0; z < objetos.length; z++) {
    await anadirObjeto(objetos[z]);
  }
}

async function anadirKit(kit) {
  var valores = [];
  var titulo = [];
  ubicacion = (await realizarConsulta("apis/busqueda/buscarUbicacion.php", { idUbicacion: kit.Ubicacion_idUbicacion }))[0];

  valores.push("Edificio: " + ubicacion.edificio + " | Planta: " + ubicacion.planta + " | Ubicacion: " + ubicacion.ubicacion);
  if (kit.fechaAdquisicion != null) valores.push("Fecha adquisición: " + kit.fechaAdquisicion);
  titulo.push(nombreGrupoObjeto + " con id " + kit.idKit);
  titulo.push("location.hash='kit-" + kit.idObjeto + "';")
  
  insertCard($("#insideContainer"), null, titulo, valores, { "Modificar": "showModal(" + kit.idKit + ");", "Solicitud": "showModal2(" + kit.idKit + ");" }, null, null);

}

async function anadirObjetoKit(objetoKit) {
  var valores = [];
  var titulo = [];
  ubicacion = (await realizarConsulta("apis/busqueda/buscarUbicacion.php", { idUbicacion: objeto.Ubicacion_idUbicacion }))[0];

  valores.push("Edificio: " + ubicacion.edificio + " | Planta: " + ubicacion.planta + " | Ubicacion: " + ubicacion.ubicacion);
  if (objeto.fechaAdquisicion != null) valores.push("Fecha adquisición: " + objeto.fechaAdquisicion);
  titulo.push(nombreGrupoObjeto + " con id " + objeto.idObjeto);
  titulo.push("location.hash='objeto-" + objeto.idObjeto + "';")

  if (objeto.codigo != -1) {
    valores.push("Código: " + objeto.codigo);
  }

  if (objeto.mejorasEquipo != null) valores.push("Mejoras del equipo: " + objeto.mejorasEquipo);

  insertCard($("#insideContainer"), null, titulo, valores, { "Modificar": "showModal(" + objeto.idObjeto + ");", "Solicitud": "showModal2(" + objeto.idObjeto + ");" }, null, null);

}

async function anadirObjeto(objeto) {
  var valores = [];
  var titulo = [];
  ubicacion = (await realizarConsulta("apis/busqueda/buscarUbicacion.php", { idUbicacion: objeto.Ubicacion_idUbicacion }))[0];

  valores.push("Edificio: " + ubicacion.edificio + " | Planta: " + ubicacion.planta + " | Ubicacion: " + ubicacion.ubicacion);
  if (objeto.fechaAdquisicion != null) valores.push("Fecha adquisición: " + objeto.fechaAdquisicion);
  titulo.push(nombreGrupoObjeto + " con id " + objeto.idObjeto);
  titulo.push("location.hash='objeto-" + objeto.idObjeto + "';")

  if (objeto.codigo != -1) {
    valores.push("Código: " + objeto.codigo);
  }

  if (objeto.mejorasEquipo != null) valores.push("Mejoras del equipo: " + objeto.mejorasEquipo);

  insertCard($("#insideContainer"), null, titulo, valores, { "Modificar": "showModal(" + objeto.idObjeto + ");", "Solicitud": "showModal2(" + objeto.idObjeto + ");" }, null, null);

}

async function cargarGrupoObjeto() {
  grupoObjeto = (await realizarConsulta("apis/busqueda/buscarGrupoDeObjetos.php", { idGrupoObjetos: aux }))[0];
  nombreGrupoObjeto = await grupoObjeto.nombre;

  var botones = null;
  if (grupoObjeto.tipo == "2") {
    botones = { "Mostrar objetos del kit": "mostrarObjetosDelKit()" };
  }
  var tituloGO = [];
  var valoresGO = [];

  tituloGO.push(nombreGrupoObjeto);
  tituloGO.push(null);

  if (grupoObjeto.marca != "") valoresGO.push("Marca: " + grupoObjeto.marca);
  if (grupoObjeto.modelo != "") valoresGO.push("Modelo: " + grupoObjeto.modelo);


  valoresGO.push("Cantidad: " + grupoObjeto.cantidad);
  valoresGO.push("Cantidad disponible: " + grupoObjeto.cantidadDisponible);

  if (grupoObjeto.tipo == 0) tipoGO = "Inventario";
  else tipoGO = "Fungible";

  insertCard($("#insideGOContainer"), "images/objects/" + await grupoObjeto.imagen, tituloGO, valoresGO, botones, tipoGO, 22);
}

function mostrarObjetosDelKit() {
  $("#objetosKit").modal("show");
}


