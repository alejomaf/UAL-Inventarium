async function cargarGrupoObjetos(){
    objetosGroup=await realizarConsulta("apis/busqueda/buscarGrupoDeObjetos.php", {nombre: "%"});

    for(i=0;i<objetosGroup.length;i++){

      if(objetosGroup[i].tipo==0){
        anadirGrupoObjeto(objetosGroup[i],0);
      }else if(objetosGroup[i].tipo==1){
        anadirGrupoObjeto(objetosGroup[i],1);
      }
    }
}

function anadirGrupoObjeto(grupoObjeto, tipo){
  var marcoAuxiliar=$("#marco").clone();
  
  $("#linkGrupoObjeto").attr("onclick","location.hash='#gobjetos-"+grupoObjeto.idGrupoObjetos+"';");
  $("#modificarGrupoDeObjetos").attr("onclick","showModal('"+grupoObjeto.idGrupoObjetos+"');"); 
  $("#nombreGrupoObjeto").text(grupoObjeto.nombre);
  $("#imagen").attr("src","images/objects/"+grupoObjeto.imagen);

  if(grupoObjeto.marca!="") $("#marca").text("Marca: "+grupoObjeto.marca); else $("#marca").remove();
  if(grupoObjeto.modelo!="") $("#modelo").text("Modelo: "+grupoObjeto.modelo); else $("#modelo").remove();


  $("#cantidad").text("Cantidad: "+grupoObjeto.cantidad);
  $("#cantidadDisponible").text("Cantidad disponible: "+grupoObjeto.cantidadDisponible);

  if(tipo==0) $("#tipo").text("Inventario");
  else $("#tipo").text("Fungible");

  
  $("#marco").clone().appendTo("#insideContainer");

  $("#copiar").children("#marco").remove();
  $("#copiar").append(marcoAuxiliar);
}

cargarGrupoObjetos();