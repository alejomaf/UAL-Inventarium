var objetoT;
var nombreGrupoObjeto;

async function cargarGrupoObjetos(){
  await cargarGrupoObjeto();

  objetos= await realizarConsulta("apis/busqueda/buscarObjeto.php", {GrupoObjetos_idGrupoObjetos: aux});

    if(objetos==null) return;
    for(i=0;i<objetos.length;i++){
      if(objetos[i].tipo==0){
        await anadirGrupoObjeto(objetos[i],0);
      }else{
        await anadirGrupoObjeto(objetos[i],1);
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

  if(tipo!=0){
    valores.push("Código: "+objeto.codigo);
  }

  if(objeto.mejorasEquipo!="") valores.push("Mejoras del equipo: "+objeto.mejorasEquipo);

  insertCard($("#insideContainer"), null, titulo, valores, {"Modificar":"showModal("+objeto.idObjeto+");","Solicitud":"showModal2("+objeto.idObjeto+");"},null);
  
}

async function cargarGrupoObjeto(){
  grupoObjeto=(await realizarConsulta("apis/busqueda/buscarGrupoDeObjetos.php",{idGrupoObjetos: aux}))[0];
  nombreGrupoObjeto = await grupoObjeto.nombre;
  objetoT=grupoObjeto.tipo;
  
  $("#nombreGrupoObjeto").text(grupoObjeto.nombre);
  $("#imagen").attr("src","images/objects/"+grupoObjeto.imagen);

  if(grupoObjeto.marca!="") $("#marca").text("Marca: "+grupoObjeto.marca); else $("#marca").remove();
  if(grupoObjeto.modelo!="") $("#modelo").text("Modelo: "+grupoObjeto.modelo); else $("#modelo").remove();


  $("#cantidad").text("Cantidad: "+grupoObjeto.cantidad);
  $("#cantidadDisponible").text("Cantidad disponible: "+grupoObjeto.cantidadDisponible);

  if(tipo==0) $("#tipo").text("Inventario");
  else $("#tipo").text("Fungible");
}

cargarGrupoObjetos();

