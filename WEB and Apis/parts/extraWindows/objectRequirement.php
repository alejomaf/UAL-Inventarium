<!-- The modalGroupObject -->

<div id="ventanaFlotante2" class="modal">
  <!-- Modal content -->
  <div class="modal-content">

  <nav class="navbar navbar-expand-lg navbar-light bg-light">

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" onclick="crearSolicitud()">Solicitar objeto<span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" onclick="solicitudes()">Solicitudes</a>
      </li>
    </ul>
  </div>
    </nav>

    <div id="crearSolicitud">
        <div class="form-group" style="visibility:hidden">
            <label for="formGroupExampleInput">Escriba el nombre completo de la persona que recibirá el objeto</label>
        </div>
        <h5>Crear solicitud</h5>
            <form>
                <div class="form-group">
                    <label for="formGroupExampleInput">Escriba el nombre completo de la persona que recibirá el objeto</label>
                    <input type="text" class="form-control" id="nombreS" placeholder="Nombre">
                </div>
                <div class="form-group">
                    <label for="formGroupExampleInput2">Fecha estimada de devolución del objeto</label>
                    <input type="date" class="form-control" id="fechaEstimadaS" placeholder="Marca">
                </div>
                <div class="form-group" style="visibility:hidden">
                    <label for="formGroupExampleInput">Escriba el nombre completo de la persona que recibirá el objeto</label>
                </div>
            </form>
        <div class="btn-group">
            <button type="button" id="eliminarGO" class="btn btn-primary">Eliminar</button>
            <button type="button" class="btn btn-primary" style="visibility:hidden"></button>
            <button type="button" id="crearS" class="btn btn-primary">Crear</button>
        </div>
    </div>
  
    <div id="solicitudes">
        <div class="form-group" style="visibility:hidden">
            <label for="formGroupExampleInput">Escriba el nombre completo de la persona que recibirá el objeto</label>
        </div>
        <h5>Solicitudes</h5>
            <h6>Préstamos activos</h6>
            <ul id="prestamosActivos">
            </ul>
            <h6>Solicitudes pendientes</h6>
            <ul id="solicitudesActivas">
            </ul>
    </div>
    

  </div>
</div>

<script>

$("#realizarSolicitud").click(function(){showModal()});
$("#solicitudes").hide();

async function showModal2(dato){
    await cargarDatosSolicitud(dato);
    $("#crearS").attr("onclick","crearSolicitudes("+dato+");"); 
    $("#ventanaFlotante2").modal("show");
    //$("#eliminarGO").attr("onclick","eliminarObjeto("+dato+");"); 
}

function solicitudes(){
    if($("#solicitudes").is(":visible")) return;
    $("#solicitudes").show();
    $("#crearSolicitud").hide();
}

function crearSolicitud(){
    if($("#crearSolicitud").is(":visible")) return;
    $("#solicitudes").hide();
    $("#crearSolicitud").show();
}

async function cargarDatosSolicitud(dato){
    prestamosActivos = await realizarConsulta("apis/busqueda/buscarPrestamo.php",{Objeto_idObjeto:dato, estado:0});
    if(prestamosActivos==null) await anadirObjetoSolicitud($("#prestamosActivos"), "No hay préstamos activos", "ANADIR ACCION");
    else{
        for( i=0; i<prestamosActivos.length;i++) anadirObjetoSolicitud($("#prestamosActivos"), prestamosActivos[i].retiradoPor, "ANADIR ACCION");
    }
    prestamosEspera = await realizarConsulta("apis/busqueda/buscarPrestamo.php",{Objeto_idObjeto:dato, estado:-1});
    if(prestamosEspera==null) await anadirObjetoSolicitud($("#solicitudesActivas"), "No hay préstamos en espera", "ANADIR ACCION");
    else{
        for( i=0; i<prestamosEspera.length;i++) anadirObjetoSolicitud($("#solicitudesActivas"), prestamosEspera[i].retiradoPor, "ANADIR ACCION");
    }
}

async function anadirObjetoSolicitud(ubicacion, texto, accion){
    var fila=document.createElement("li");
    fila.textContent=texto;
    fila.setAttribute("class","list-group-item");
    fila.setAttribute("onclick",accion);
    await ubicacion.append(fila);
}

async function crearSolicitudes(dato){
    if($("#nombreS").val()=="") return;
    if($("#fechaEstimadaS").val()=="") return;
    await realizarConsulta("apis/creacion/crearPrestamo.php",{fechaEstimadaEntrega: $("#fechaEstimadaS").val(),retiradoPor: $("#nombreS").val(),objeto:dato});
}

</script>