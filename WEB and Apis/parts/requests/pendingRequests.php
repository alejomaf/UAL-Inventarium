<script>
var solicitudes=[];

async function concederPrestamo(id){
}
async function eliminarSolicitud(id){
}

async function cargarSolicitudes(){
    solicitudes=await realizarConsulta("apis/busqueda/buscarPrestamo.php",{estado:-1});
    for(k=0;k<solicitudes.length;k++) {
        await anadirSolicitud(solicitudes[k]);
    }
}

async function anadirSolicitud(solicitud){
    objeto= (await realizarConsulta("apis/busqueda/buscarObjeto.php", {idObjeto: solicitud.Objeto_idObjeto}))[0];
    grupoObjeto= (await realizarConsulta("apis/busqueda/buscarGrupoDeObjetos.php", {idGrupoObjetos: solicitud.Objeto_GrupoObjetos_idGrupoObjetos}))[0];
    usuario= (await realizarConsulta("apis/busqueda/buscarUsuario.php", {idUsuario: solicitud.Usuario_idUsuario}))[0];

    filas=[];

    if(grupoObjeto.tipo==0){
      filas.push("Código: "+objeto.codigo);
      tipoObjeto= "Inventario";
    }else tipoObjeto= "Fungible";

    if(grupoObjeto.marca!="") filas.push("Marca: "+grupoObjeto.marca);
    if(grupoObjeto.modelo!="") filas.push("Modelo: "+grupoObjeto.modelo);
    if(objeto.mejorasEquipo!="") filas.push("Mejoras del equipo: "+objeto.mejorasEquipo);

    insertCard($("#variableArea"),"images/objects/"+grupoObjeto.imagen,[grupoObjeto.nombre,"location.hash='#prestamo-"+solicitud.idPrestado+"';"],filas,{"Eliminar solicitud":"eliminarSolicitud('"+solicitud.idGrupoObjetos+"');","Conceder préstamos":"concederPrestamo('"+solicitud.idPrestado+"');"},tipoObjeto);
}

cargarSolicitudes();
</script>