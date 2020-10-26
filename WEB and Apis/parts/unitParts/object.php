<div><div class="row justify-content-center">
<div style="cursor:pointer;" id="marcoGrupoObjetos" class="col-auto mb-3">
<div class="card" style="width: 36rem;">
<div style="width= 100%; height: 300px;">
  <img id="imagen"  class="card-img-top" src="" alt="Card image cap"></div>
  <div class="card-body">
    <h5 id="nombreGrupoObjeto" class="text-light bg-dark">Card title<</h5>
  </div>
  <ul class="list-group list-group-flush">
    <li id="marca" class="list-group-item">Cras justo odio</li>
    <li id="modelo" class="list-group-item">Dapibus ac facilisis in</li>
    <li id="codigo" class="list-group-item">Cras justo odio</li>
    <li id="ubicacion" class="list-group-item">Dapibus ac facilisis in</li>
    <li id="mejoras" class="list-group-item">Dapibus ac facilisis in</li>
  </ul>
  <div class="card-body">
    <button type="button" class="btn btn-link"  id="modificarObjeto">Modificar</button>
    <button type="button" class="btn btn-link"  id="solicitudObjeto">Solicitud</button>
  </div>
  <li id="tipo" class="list-group-item text-secondary">Vestibulum at eros</li>
  <ul id="prestamoActivo" class="list-group list-group-flush">
    <li class="list-group-item"><h6>Préstamo activo</h6></li>
  </ul>
  <ul id="solicitudesPendientes" class="list-group list-group-flush">
    <li class="list-group-item"><h6>Solicitudes pendientes</h6></li>
  </ul>
  <ul id="prestamosFinalizados" class="list-group list-group-flush">
    <li class="list-group-item"><h6>Préstamos finalizados</h6></li>
  </ul>
</div>
</div>
</div>
<div id="copiarBarra" hidden><div id="barra" class="container"><div class="row"><div id="izquierda" class="col"></div><div style="visibility:hidden" class="col"></div><div id="derecha" class="col-8"></div></div></div></div>
<?php include "../extraWindows/modifyObject.php";?>
<?php include "../extraWindows/objectRequirement.php";?>

<script>

async function cargarObjeto(){
    objeto= (await realizarConsulta("apis/busqueda/buscarObjeto.php", {idObjeto: aux}))[0];
    await anadirGrupoObjeto(objeto);
}
async function anadirBarra(ubicacion, texto1, texto2){
    var barraAuxiliar=$("#barra").clone();

    $("#izquierda").text(texto1);
    $("#derecha").text(texto2);

    $("#barra").clone().appendTo(ubicacion);
  
    $("#copiarBarra").children("#barra").remove();
    $("#copiarBarra").append(barraAuxiliar);
}

async function procesarSolicitudes(id){
    $("#prestamoActivo").hide();
    $("#solicitudesPendientes").hide();
    $("#prestamosFinalizados").hide();
    
    solicitudes= await realizarConsulta("apis/busqueda/buscarPrestamo.php",{Objeto_idObjeto:id});
    if(solicitudes==null) return;
    for(i=0; i<solicitudes.length;i++){
        usuario= (await realizarConsulta("apis/busqueda/buscarUsuario.php", {idUsuario: solicitudes[i].Usuario_idUsuario}))[0];
        if(solicitudes[i].estado==0){
            $("#prestamoActivo").show();
            anadirBarra($("#prestamoActivo"), usuario.nombre, "Fecha estimada de entrega: "+solicitudes[i].fechaEstimadaEntrega);
        }
        else if(solicitudes[i].estado==-1){
            $("#solicitudesPendientes").show();
            anadirBarra($("#solicitudesPendientes"), usuario.nombre, "Fecha solicitud: "+solicitudes[i].solicitado);
        }
        else{
            $("#prestamosFinalizados").show();
            anadirBarra($("#prestamosFinalizados"), usuario.nombre, "Fecha de entrega: "+solicitudes[i].fechaEntrega);
        }
    }

}

async function anadirGrupoObjeto(objeto){
    grupoObjeto= (await realizarConsulta("apis/busqueda/buscarGrupoDeObjetos.php", {idGrupoObjetos: objeto.GrupoObjetos_idGrupoObjetos}))[0];
    await procesarSolicitudes(objeto.idObjeto);

  var marcoAuxiliar=$("#marco").clone();

  ubicacion=(await realizarConsulta("apis/busqueda/buscarUbicacion.php",{idUbicacion: objeto.Ubicacion_idUbicacion}))[0];

  $("#ubicacion").text("Edificio: "+ubicacion.edificio+" | Planta: "+ubicacion.planta+" | Ubicacion: "+ubicacion.ubicacion);

    $("#imagen").attr("src","images/objects/"+grupoObjeto.imagen);

    if(grupoObjeto.marca!="") $("#marca").text("Marca: "+grupoObjeto.marca); else $("#marca").remove();
    if(grupoObjeto.modelo!="") $("#modelo").text("Modelo: "+grupoObjeto.modelo); else $("#modelo").remove();
    
    $("#nombreGrupoObjeto").text(grupoObjeto.nombre+" con id: "+objeto.idObjeto)

  if(objeto.tipo!=0){
    $("#tipo").text("Fungible");
    $("#codigo").remove();
  }else{
    $("#tipo").text("Inventario");
    $("#codigo").text("Código: "+objeto.codigo);
  }
  $("#modificarObjeto").attr("onclick","showModal("+objeto.idObjeto+");"); 

  if(objeto.mejorasEquipo!="") $("#mejoras").text("Mejoras del equipo: "+objeto.mejorasEquipo); else $("#mejoras").remove();

  $("#solicitudObjeto").attr("onclick","showModal2("+objeto.idObjeto+");");
  

  $("#marco").clone().appendTo("#insideContainer");
  
  $("#copiar").children("#marco").remove();
  $("#copiar").append(marcoAuxiliar);
}

cargarObjeto();
</script>