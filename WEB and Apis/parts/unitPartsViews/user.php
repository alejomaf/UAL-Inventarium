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

    if(usersGroup==null){
        elUsuarioNoExiste($("#variableArea"));
        return;
    }
    
    anadirUsuario(usersGroup[0]);
}

async function anadirUsuario(usuario){
  var valores=[];
  var titulo=[];

  valores.push("Correo electrónico: "+usuario.correoElectronico);
  valores.push("Departamento: "+usuario.departamento);
  valores.push("Teléfono: "+usuario.telefono);
  
  titulo.push(usuario.nombre);
  titulo.push(null);

  if(usuario.rango==0) var etiqueta="Técnico";
  else var etiqueta="Profesor";
  
  insertCard($("#variableArea"),null, titulo, valores, null,etiqueta,22);
  await procesarSolicitudes(usuario.idUsuario);
}

cargarUsuarios();

</script>