var busquedaGO = { eliminado: 0};

async function cargarGrupoObjetos() {
  limpiarZona($("#insideContainer"));
  objetosGroup = await realizarConsulta("apis/busqueda/buscarGrupoDeObjetos.php", busquedaGO);
  if (objetosGroup == null) return;
  for (i = 0; i < objetosGroup.length; i++) {
      anadirGrupoObjeto(objetosGroup[i]);
  }
}

async function anadirGrupoObjeto(grupoObjeto) {
  var tipoGO="";
  nombreGrupoObjeto = grupoObjeto.nombre;

  var tituloGO = [];
  var valoresGO = [];

  tituloGO.push(nombreGrupoObjeto);
  tituloGO.push("location.hash='#gobjetos-" + grupoObjeto.idGrupoObjetos + "';");

  if (grupoObjeto.marca != "") valoresGO.push("Marca: " + grupoObjeto.marca);
  if (grupoObjeto.modelo != "") valoresGO.push("Modelo: " + grupoObjeto.modelo);


  valoresGO.push("Cantidad: " + grupoObjeto.cantidad);
  valoresGO.push("Cantidad disponible: " + grupoObjeto.cantidadDisponible);

  if (grupoObjeto.tipo == "0") tipoGO = "Inventario";
  else if(grupoObjeto.tipo=="1") tipoGO ="Fungible";
  else tipoGO = "Kit";

  insertCard($("#insideContainer"), "images/objects/" + await grupoObjeto.imagen, tituloGO, valoresGO, { "Modificar": "showModal(" + grupoObjeto.idGrupoObjetos + ");" }, tipoGO, 22);
}

cargarGrupoObjetos();