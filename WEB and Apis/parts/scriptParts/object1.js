var objetoT;
var nombreGrupoObjeto;

async function cargarGrupoObjetos(){
  await cargarGrupoObjeto();

  objetos= await realizarConsulta("apis/busqueda/buscarObjeto.php", {GrupoObjetos_idGrupoObjetos: aux});

    if(objetos==null) return;
    for(i=0;i<objetos.length;i++){
      if(objetos[i].codigo==-1){
        anadirGrupoObjeto(objetos[i],-1);
      }else{
        anadirGrupoObjeto(objetos[i],1);
      }
    }
}

async function anadirGrupoObjeto(objeto, tipo){
  var valores=[];
  var titulo=[];
  ubicacion=(await realizarConsulta("apis/busqueda/buscarUbicacion.php",{idUbicacion: objeto.Ubicacion_idUbicacion}))[0];

  valores.push("Edificio: "+ubicacion.edificio+" | Planta: "+ubicacion.planta+" | Ubicacion: "+ubicacion.ubicacion);
  
  titulo.push(nombreGrupoObjeto+" con id "+objeto.idObjeto);
  titulo.push("location.hash='objeto-"+objeto.idObjeto+"';")

  if(tipo!=-1){
    valores.push("Código: "+objeto.codigo);
  }

  if(objeto.mejorasEquipo!=null) valores.push("Mejoras del equipo: "+objeto.mejorasEquipo);

  insertCard($("#insideContainer"), null, titulo, valores, {"Modificar":"showModal("+objeto.idObjeto+");","Solicitud":"showModal2("+objeto.idObjeto+");"},null,null);
  
}

async function cargarGrupoObjeto(){
  grupoObjeto=(await realizarConsulta("apis/busqueda/buscarGrupoDeObjetos.php",{idGrupoObjetos: aux}))[0];
  nombreGrupoObjeto = await grupoObjeto.nombre;

  var tituloGO=[];
  var valoresGO = [];

  tituloGO.push(nombreGrupoObjeto);
  tituloGO.push(null);

  if(grupoObjeto.marca!="") valoresGO.push("Marca: "+grupoObjeto.marca);
  if(grupoObjeto.modelo!="") valoresGO.push("Modelo: "+grupoObjeto.modelo);


  valoresGO.push("Cantidad: "+grupoObjeto.cantidad);
  valoresGO.push("Cantidad disponible: "+grupoObjeto.cantidadDisponible);

  if(grupoObjeto.tipo==0) tipoGO="Inventario";
  else tipoGO="Fungible";

  insertCard($("#insideGOContainer"), "images/objects/"+await grupoObjeto.imagen, tituloGO, valoresGO, null,tipoGO,22);
}

cargarGrupoObjetos();

