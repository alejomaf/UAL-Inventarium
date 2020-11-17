<!-- ADD TO THE CONTAINTER THE CARDS-->
<div id="copiar" style="display:none">
<div id="marco" class="col-auto mb-3" style="width: 18rem;">
<div class="card" style="width: 30rem;"><div style="width= 100%; height: 230px;"> 
  <img id="imagen" class="card-img-top" src="" alt="Card image cap"></div>
  <div class="card-body">
    <h5 style="cursor:pointer;" id="nombreSolicitud" class="card-title text-primary">Card title</h5>
  </div>
  <ul class="list-group list-group-flush">
    <li id="codigo" class="list-group-item">Dapibus ac facilisis in</li>
    <li id="marca" class="list-group-item">Cras justo odio</li>
    <li id="modelo" class="list-group-item">Dapibus ac facilisis in</li>
    <li id="mejoras" class="list-group-item">Mejoras</li>
    <li id="solicitante" class="list-group-item">Solicitante</li>
    <li id="destinatario" class="list-group-item">Destinatario</li>
  </ul>
  <div class="btn-group">
    <button type="button" class="btn btn-link" id="eliminarSolicitud" class="card-link">Rechazar solicitud</button>
    <button type="button" class="btn btn-link" id="concederPrestamo" class="card-link">Conceder préstamo</button>
  </div>
  <li id="tipo" class="list-group-item">Vestibulum at eros</li>
</div>
</div>
</div></div>

<div class="row justify-content-center"><div id="insideContainer" class="row"></div></div>

<script>
var solicitudes=[];

async function concederPrestamo(id){
}
async function eliminarSolicitud(id){
}

async function cargarSolicitudes(){
    solicitudes=await realizarConsulta("apis/busqueda/buscarPrestamo.php",{idPrestado:aux});
    for(i=0;i<solicitudes.length;i++) {
        await anadirSolicitud(solicitudes[i]);
    }
}

async function anadirSolicitud(solicitud){
    objeto= (await realizarConsulta("apis/busqueda/buscarObjeto.php", {idObjeto: solicitud.Objeto_idObjeto}))[0];
    grupoObjeto= (await realizarConsulta("apis/busqueda/buscarGrupoDeObjetos.php", {idGrupoObjetos: solicitud.Objeto_GrupoObjetos_idGrupoObjetos}))[0];
    usuario= (await realizarConsulta("apis/busqueda/buscarUsuario.php", {idUsuario: solicitud.Usuario_idUsuario}))[0];

    var marcoAuxiliar=$("#marco").clone();
    
    $("#nombreSolicitud").attr("onclick","location.hash='#prestamo-"+solicitud.idPrestado+"';");
    $("#concederPrestamo").attr("onclick","concederPrestamo('"+solicitud.idPrestado+"');"); 
    $("#eliminarSolicitud").attr("onclick","eliminarSolicitud('"+solicitud.idGrupoObjetos+"');"); 
    $("#nombreSolicitud").text(grupoObjeto.nombre);
    $("#destinatario").text("Objeto destinado a: "+solicitud.retiradoPor);
    $("#solicitante").text("Solicitado por: "+usuario.nombre);
    $("#imagen").attr("src","images/objects/"+grupoObjeto.imagen);

    if(grupoObjeto.marca!="") $("#marca").text("Marca: "+grupoObjeto.marca); else $("#marca").remove();
    if(grupoObjeto.modelo!="") $("#modelo").text("Modelo: "+grupoObjeto.modelo); else $("#modelo").remove();
    if(objeto.mejorasEquipo!="") $("#mejoras").text("Mejoras: "+objeto.mejorasEquipo); else $("#mejoras").remove();

    if(grupoObjeto.tipo==0) {
        $("#tipo").text("Inventario");
        $("#codigo").text(objeto.codigo);
    }else {
        $("#tipo").text("Fungible");
        $("#codigo").remove();
    }
    $("#marco").clone().appendTo("#insideContainer");

    $("#copiar").children("#marco").remove();
    $("#copiar").append(marcoAuxiliar);
}

cargarSolicitudes();
</script>