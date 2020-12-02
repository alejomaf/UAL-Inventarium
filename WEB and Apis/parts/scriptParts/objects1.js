async function cargarGrupoObjetos(){
    objetosGroup=await realizarConsulta("apis/busqueda/buscarGrupoDeObjetos.php", {nombre: "%"});
    if(objetosGroup==null) return;
    for(i=0;i<objetosGroup.length;i++){
      if(objetosGroup[i].tipo==0){
        anadirGrupoObjeto(objetosGroup[i]);
      }else if(objetosGroup[i].tipo==1){
        anadirGrupoObjeto(objetosGroup[i]);
      }
    }
}

async function anadirGrupoObjeto(grupoObjeto){
  nombreGrupoObjeto = grupoObjeto.nombre;

  var tituloGO=[];
  var valoresGO = [];

  tituloGO.push(nombreGrupoObjeto);
  tituloGO.push("location.hash='#gobjetos-"+grupoObjeto.idGrupoObjetos+"';");

  if(grupoObjeto.marca!="") valoresGO.push("Marca: "+grupoObjeto.marca);
  if(grupoObjeto.modelo!="") valoresGO.push("Modelo: "+grupoObjeto.modelo);


  valoresGO.push("Cantidad: "+grupoObjeto.cantidad);
  valoresGO.push("Cantidad disponible: "+grupoObjeto.cantidadDisponible);

  if(grupoObjeto.tipo==0) tipoGO="Inventario";
  else tipoGO="Fungible";

  insertCard($("#insideContainer"), "images/objects/"+await grupoObjeto.imagen, tituloGO, valoresGO, {"Modificar":"showModal("+grupoObjeto.idGrupoObjetos+");"},tipoGO,22);
}

cargarGrupoObjetos();