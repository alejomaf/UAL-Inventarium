
<div>
<h4>Finalizado plazo estimado de fecha de entrega</h4>
<div class="container-fluid mt-4"><div id="insideContainer" class="row"></div></div>
<h4>Préstamos activos</h4>
<script>
var solicitudes=[];

async function tramitarRecibo(id){
}
async function enviarRecordatorio(id){
}

async function cargarSolicitudes(){
    solicitudes=await realizarConsulta("apis/busqueda/buscarPrestamo.php",{estado:0});
    for(k=0;k<solicitudes.length;k++) {
      
      console.log(k);
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

    insertCard($("#variableArea"),"images/objects/"+grupoObjeto.imagen,[grupoObjeto.nombre,"location.hash='#prestamo-"+solicitud.idPrestado+"';"],filas,{"Enviar recordatorio de entrega":"enviarRecordatorio('"+solicitud.idGrupoObjetos+"');","Tramitar recibo":"tramitarRecibo('"+solicitud.idPrestado+"');"},tipoObjeto);
}

cargarSolicitudes();
</script>