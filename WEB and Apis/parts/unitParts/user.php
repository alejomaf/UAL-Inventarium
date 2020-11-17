<!-- ADD TO THE CONTAINTER THE CARDS-->
<div id="copiar" style="display:none">
<div style="cursor:pointer;" id="marco" class="col-auto mb-3" style="width: 18rem;">
<div class="card" style="width: 30rem;">
  <div class="card-body">
    <h5 id="nombreUsuario" class="card-title">Card title</h5>
  </div>
  <ul class="list-group list-group-flush">
    <li id="correoElectronico" class="list-group-item">Cras justo odio</li>
    <li id="departamento" class="list-group-item">Dapibus ac facilisis in</li>
    <li id="telefono" class="list-group-item">Dapibus ac facilisis in</li>
  </ul>
  <li id="rango" class="list-group-item">Vestibulum at eros</li>
  <ul id="prestamoActivo" class="list-group list-group-flush">
    <li class="list-group-item"><h6>Préstamos activos</h6></li>
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

<div class="row justify-content-center"><div id="insideContainer" class="row"></div></div>
<div id="copiarBarra" hidden><div id="barra" class="container"><div class="row"><div id="izquierda" class="col"></div><div style="visibility:hidden" class="col"></div><div id="derecha" class="col-7"></div></div></div></div>


<script>

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
    
    solicitudes= await realizarConsulta("apis/busqueda/buscarPrestamo.php",{Usuario_idUsuario:aux});
    if(solicitudes==null) return;
    for(i=0; i<solicitudes.length;i++){
        grupoObjeto= (await realizarConsulta("apis/busqueda/buscarGrupoDeObjetos.php", {idGrupoObjetos: solicitudes[i].Objeto_GrupoObjetos_idGrupoObjetos}))[0];
        if(solicitudes[i].estado==0){
            $("#prestamoActivo").show();
            anadirBarra($("#prestamoActivo"), grupoObjeto.nombre, "Fecha estimada de entrega: "+solicitudes[i].fechaEstimadaEntrega);
        }
        else if(solicitudes[i].estado==-1){
            $("#solicitudesPendientes").show();
            anadirBarra($("#solicitudesPendientes"), grupoObjeto.nombre, "Fecha solicitud: "+solicitudes[i].solicitado);
        }
        else{
            $("#prestamosFinalizados").show();
            anadirBarra($("#prestamosFinalizados"), grupoObjeto.nombre, "Fecha de entrega: "+solicitudes[i].fechaEntrega);
        }
    }

}

async function cargarUsuarios(){
    usersGroup=await realizarConsulta("apis/busqueda/buscarUsuario.php", {idUsuario: aux});

    for(i=0;i<usersGroup.length;i++){
      if (usersGroup[i].rango!=-1) anadirUsuario(usersGroup[i]);
    }

}

async function anadirUsuario(usuario){
    await procesarSolicitudes(usuario.idUsuario);
    var marcoAuxiliar=$("#marco").clone();

  $("#marco").attr("onclick","location.hash='#usuarios-"+usuario.idusuario+"'");
  $("#nombreUsuario").text(usuario.nombre);

  $("#correoElectronico").text("Correo electrónico: "+usuario.correoElectronico);
  $("#departamento").text("Departamento: "+usuario.departamento);
  $("#telefono").text("Teléfono: "+usuario.telefono);

  if(usuario.rango==0) $("#rango").text("Técnico");
  else $("#rango").text("Profesor");
  
  $("#marco").clone().appendTo("#insideContainer");

  $("#copiar").children("#marco").remove();
  $("#copiar").append(marcoAuxiliar);
}

cargarUsuarios();

</script>