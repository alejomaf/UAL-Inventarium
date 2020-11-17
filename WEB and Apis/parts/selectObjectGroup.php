<!-- The modalGroupObject -->
<div id="myModalGroupObject" class="modal">
  <!-- Modal content -->
  <div class="modal-content">
    <h5>Busca el objeto o añade uno nuevo</h5>
    <input id="grupoDeObjetos" type="text" placeholder="Escribe tu búsqueda o el nombre del nuevo objeto">
    <div class="alert alert-secondary" id="alertaCreacion" role="alert">
      Escribe el nombre del objeto antes de crearlo
    </div>
    <li class="list-group-item list-group-item-action list-group-item-primary" onclick="if(grupoDeObjetos.value==''){ $('.alertaCreacion').alert(); return;} crearSeleccionarObjeto(-1);">Crea un nuevo objeto</li>
    <ul id="botonesGroupObject" class="list-group">
</ul>
  </div>

</div>

<script>
var responseGroupObject="";
var busqueda=document.getElementById("grupoDeObjetos");
var cuadroObjectGroup=document.getElementById("botonesGroupObject");
var botonObjectGroup=document.getElementById("botonEscritoGroupObject");
var botonValorGroupObject=document.getElementById("botonValorGroupObject");
var objetosGroup=[];


async function cargarGrupoObjetos(){
    var busquedaV=busqueda.value.toLowerCase();
    cuadroObjectGroup.innerHTML="";

    var gobjetos=[];
    var gobjetosid={};

    if(objetoT!=-1) 
    for(i=0;i<objetosGroup.length;i++){
        if((objetosGroup[i].nombre.toLowerCase()).search(busquedaV)!=-1){
          if(objetoT==0){
            if(objetosGroup[i].tipo==0){
              gobjetos.push(objetosGroup[i].nombre);
              gobjetosid[objetosGroup[i].nombre]=objetosGroup[i].idGrupoObjetos;
            }
          }else {
            if(objetosGroup[i].tipo==1){
              gobjetos.push(objetosGroup[i].nombre);
              gobjetosid[objetosGroup[i].nombre]=objetosGroup[i].idGrupoObjetos;
            }
          }
        }
    }

    gobjetos.sort();

    for(i=0; i< gobjetos.length;i++){
        anadirGrupoObjeto(gobjetos[i],"botonObjectGroup.value='"+gobjetos[i]+"'; crearSeleccionarObjeto('"+gobjetosid[gobjetos[i]]+"'); botonValorGroupObject.value='"+gobjetos[i]+"';");
    }
}

function anadirGrupoObjeto(texto, accion){

    var fila=document.createElement("li");
    fila.textContent=texto;
    fila.setAttribute("class","list-group-item");
    fila.setAttribute("onclick",accion);
    cuadroObjectGroup.appendChild(fila);

}

async function principalGroupObject(){
    objetosGroup=await realizarConsulta("apis/busqueda/buscarGrupoDeObjetos.php", {nombre:"%"});
}

principalGroupObject();

$( "#grupoDeObjetos" ).keyup(function() {
  cargarGrupoObjetos();
});
</script>