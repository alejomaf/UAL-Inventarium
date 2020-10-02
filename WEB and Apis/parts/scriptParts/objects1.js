var objetosGroup=[];

async function cogerAtributosGroupObject(){

await $.post("apis/busqueda/buscarGrupoDeObjetos.php",
{
    nombre:"%"
},
function(data,status){
    responseGroupObject=data;
});

}

async function descomponerGroupObject(){
    await cogerAtributosGroupObject();
    objeto= await JSON.parse(responseGroupObject);

    return objeto;
}

async function cargarGrupoObjetos(){
    //cuadroObjectGroup.innerHTML="";

    for(i=0;i<objetosGroup.length;i++){

      if(objetosGroup[i].tipo==0){
        anadirGrupoObjeto(objetosGroup[i],0);
      }else if(objetosGroup[i].tipo==1){
        anadirGrupoObjeto(objetosGroup[i],1);
      }
    }

    /**for(i=0; i< gobjetos.length;i++){
        anadirGrupoObjeto(gobjetos[i],"botonValorGroupObject.setAttribute('value','"+gobjetosid[gobjetos[i]]+"');botonEscritoGroupObject.setAttribute('value','"+gobjetos[i]+"');modalGroupObject.style.display = 'none'; seleccionarObjeto(); botonObjectGroup.value='"+gobjetos[i]+"';");
    }*/
}

function anadirGrupoObjeto(grupoObjeto, tipo){
  var marcoAuxiliar=$("#marco").clone();
  $("#nombreGrupoObjeto").text(grupoObjeto.nombre);
  $("#imagen").attr("src",grupoObjeto.imagen);

  if(grupoObjeto.marca!=""||grupoObjeto.marca==null) $("#marca").text("Marca: "+grupoObjeto.marca); else $("#marca").remove();
  if(grupoObjeto.modelo!="") $("#modelo").text("Modelo: "+grupoObjeto.modelo); else $("#modelo").remove();


  $("#cantidad").text("Cantidad: "+grupoObjeto.cantidad);
  $("#cantidadDisponible").text("Cantidad disponible: "+grupoObjeto.cantidadDisponible);

  if(tipo==0) $("#tipo").text("Inventario");
  else $("#tipo").text("Fungible");

  
  $("#marco").clone().appendTo("#variableArea");
  //$("#marco").clone(marcoAuxiliar);
  $("#copiar").children("#marco").remove();
  $("#copiar").append(marcoAuxiliar);
}

async function principalGroupObject(){
    objetosGroup=await descomponerGroupObject();
    
    cargarGrupoObjetos();
}