var objetoT;

async function cargarGrupoObjetos(){
  await cargarGrupoObjeto();

  objetos= await realizarConsulta("apis/busqueda/buscarObjeto.php", {GrupoObjetos_idGrupoObjetos: aux});

    if(objetos==null) return;
    for(i=0;i<objetos.length;i++){
      if(objetos[i].codigo==0){
        await anadirGrupoObjeto(objetos[i],0);
      }else{
        await anadirGrupoObjeto(objetos[i],1);
      }
    }
}

async function anadirGrupoObjeto(objeto, tipo){
  var marcoAuxiliar=$("#marco").clone();

  ubicacion=(await realizarConsulta("apis/busqueda/buscarUbicacion.php",{idUbicacion: objeto.Ubicacion_idUbicacion}))[0];

  $("#ubicacion").text("Edificio: "+ubicacion.edificio+" | Planta: "+ubicacion.planta+" | Ubicacion: "+ubicacion.ubicacion);

  if(tipo!=0){
    $("#nombreObjeto").text("Fungible "+objeto.idObjeto)
    $("#codigo").remove();
  }else{
    $("#nombreObjeto").text("Inventario "+objeto.idObjeto);
    $("#codigo").text("Código: "+objeto.codigo);
  }
  $("#modificarObjeto").attr("onclick","showModal("+objeto.idObjeto+");"); 
  if(objetoT==1) $("#codigo").remove();

  if(objeto.mejorasEquipo!="") $("#mejoras").text("Mejoras del equipo: "+objeto.mejorasEquipo); else $("#mejoras").remove();

  $("#solicitudObjeto").attr("onclick","showModal2("+objeto.idObjeto+");");
  

  $("#marco").clone().appendTo("#insideContainer");
  
  $("#copiar").children("#marco").remove();
  $("#copiar").append(marcoAuxiliar);
}

async function cargarGrupoObjeto(){
  grupoObjeto=(await realizarConsulta("apis/busqueda/buscarGrupoDeObjetos.php",{idGrupoObjetos: aux}))[0];
  
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

