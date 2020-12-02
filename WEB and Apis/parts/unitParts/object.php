<?php include "../extraWindows/createConfiguration.php";?>
<script>
var idObjeto;
var idConfiguracion=null;
var configuracion=null;
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
    var prestamosActivos = [];
    var solicitudesPendientes = [];
    var prestamosFinalizados = [];
    
    solicitudes= await realizarConsulta("apis/busqueda/buscarPrestamo.php",{Objeto_idObjeto:id});

    if(solicitudes==null) return;
    for(i=0; i<solicitudes.length;i++){
        usuario= (await realizarConsulta("apis/busqueda/buscarUsuario.php", {idUsuario: solicitudes[i].Usuario_idUsuario}))[0];
        if(solicitudes[i].estado==0){
            var auxText = "Fecha estimada de entrega: "+solicitudes[i].fechaEstimadaEntrega;
            var prestActivo = [auxText, "#solicitud-"+solicitudes[i].idPrestado];
            prestamosActivos.push(prestActivo);
        }
        else if(solicitudes[i].estado==-1){
            var auxText = "Fecha solicitud: "+solicitudes[i].solicitado;
            var prestPendiente = [auxText, "#solicitud-"+solicitudes[i].idPrestado];
            solicitudesPendientes.push(prestPendiente);
        }
        else{
          var auxText = "Fecha de entrega: "+solicitudes[i].fechaEntrega;
          var prestFinalizado = [auxText, "#solicitud-"+solicitudes[i].idPrestado];
          prestamosFinalizados.push(prestFinalizado);
        }
    }
    var valoresS = [];

    if(prestamosActivos.length!=0) valoresS.push({"Préstamos activos":prestamosActivos});
    if(solicitudesPendientes.length!=0) valoresS.push({"Préstamos pendientes":solicitudesPendientes});
    if(prestamosFinalizados.length!=0) valoresS.push({"Préstamos finalizados":prestamosFinalizados});
    await insertCardRequest($("#variableArea"), null, ["Solicitudes",null], valoresS,null,22);
}

async function insertarConfiguracion(){
  var valores= [];

  if(configuracion.ip!=null) valores.push("Dirección IP: "+configuracion.ip);
  if(configuracion.mac!=null) valores.push("Dirección MAC: "+configuracion.mac);
  if(configuracion.boca!=null) valores.push("Boca: "+configuracion.boca);
  if(configuracion.armario!=null) valores.push("Armario: "+configuracion.armario);
  if(configuracion.usuario!=null) valores.push("Usuario: "+configuracion.usuario);
  if(configuracion.contrasena!=null) valores.push("Contraseña: "+configuracion.contrasena);
  
  var botones={"Modificar configuración":"showModalModificar();","Eliminar configuración":"eliminarConfiguracion(configuracion.idConfiguracion);"};
  var titulo = ["Configuración",null];

  await insertCard($("#variableArea"),null, titulo, valores, botones,null,22);
}

async function anadirGrupoObjeto(objeto){
  grupoObjeto= (await realizarConsulta("apis/busqueda/buscarGrupoDeObjetos.php", {idGrupoObjetos: objeto.GrupoObjetos_idGrupoObjetos}))[0];
  var nombreGrupoObjeto = grupoObjeto.nombre;
  idObjeto = objeto.idObjeto;

  checkConfiguracion =(await realizarConsulta("apis/busqueda/buscarConfiguracion.php",{Objeto_idObjeto: objeto.idObjeto}));
  if(checkConfiguracion!=null) {
    configuracion = checkConfiguracion[0];
    idConfiguracion = configuracion.idConfiguracion;
  }else {
    var botones = {"Añadir configuración":"showModalCrear();"};
  }
  
  ubicacion = (await realizarConsulta("apis/busqueda/buscarUbicacion.php",{idUbicacion: objeto.Ubicacion_idUbicacion}))[0];

  var valores=[];
  var titulo=[];

  valores.push("Edificio: "+ubicacion.edificio+" | Planta: "+ubicacion.planta+" | Ubicacion: "+ubicacion.ubicacion);
  
  titulo.push(nombreGrupoObjeto+" con id "+objeto.idObjeto);
  titulo.push("location.hash='objeto-"+objeto.idObjeto+"';")

  if(grupoObjeto.tipo!=-1){
    valores.push("Código: "+objeto.codigo);
    var etiqueta = "Inventario";
  }else var etiqueta = "Fungible";

  if(objeto.mejorasEquipo!=null) valores.push("Mejoras del equipo: "+objeto.mejorasEquipo);

  if(grupoObjeto.marca!="") valores.push("Marca: "+ grupoObjeto.marca);
  if(grupoObjeto.modelo!="") valores.push("Modelo: "+grupoObjeto.modelo);
  
  var imagen = "images/objects/"+grupoObjeto.imagen;
  
  insertCard($("#variableArea"), "images/objects/"+await grupoObjeto.imagen, titulo, valores, botones,etiqueta,22);
  await procesarSolicitudes(objeto.idObjeto);
  if(checkConfiguracion!=null) insertarConfiguracion();
}

cargarObjeto();
</script>