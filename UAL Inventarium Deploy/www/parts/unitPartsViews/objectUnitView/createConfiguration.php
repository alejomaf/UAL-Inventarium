<!-- The modalGroupObject -->

<div id="crearConfiguracion" class="modal">
  <!-- Modal content -->
  <div class="modal-content">
    <h5>Crear configuración</h5>
    <a>Todos los valores son opcionales*</a>
    <br>
        <form>
            <div class="form-group">
                <label for="formGroupExampleInput">IP</label>
                <input type="text" class="form-control" id="ipObjeto" placeholder="Ingrese la dirección IP">
            </div>
            <div class="form-group">
                <label for="formGroupExampleInput2">MAC</label>
                <input type="text" class="form-control" id="macObjeto" placeholder="Ingrese la dirección MAC">
            </div>
            <div class="form-group">
                <label for="formGroupExampleInput2">Boca</label>
                <input type="text" class="form-control" id="bocaObjeto" placeholder="Ingrese la boca de conexión">
            </div>
            <div class="form-group">
                <label for="formGroupExampleInput2">Armario</label>
                <input type="text" class="form-control" id="armarioObjeto" placeholder="Ingrese el armario donde se ubica">
            </div>
            <div class="form-group">
                <label for="formGroupExampleInput2">Usuario</label>
                <input type="text" class="form-control" id="usuarioObjeto" placeholder="Ingrese el usuario configurado">
            </div>
            <div class="form-group">
                <label for="formGroupExampleInput2">Contraseña</label>
                <input type="text" class="form-control" id="contrasenaObjeto" placeholder="Ingrese la contraseña configurada">
            </div>
        </form>
    <div class="btn-group">
        <button type="button" id="crearConfiguracion" class="btn btn-primary" onclick="if(idConfiguracion==null)crearConfiguracion();else modificarConfiguracion();"><span class="ui-button-text">Crear configuracion</span></button>
    </div>

  
  </div>
</div>

<script>

function showModalCrear(){
    $("#ipObjeto").val("");
    $("#macObjeto").val("");
    $("#bocaObjeto").val("");
    $("#armarioObjeto").val("");
    $("#usuarioObjeto").val("");
    $("#macObjeto").val("");
    $("#crearConfiguracion").modal("show");
}

function showModalModificar(){
    if(configuracion.ip!=null) $("#ipObjeto").val(configuracion.ip);
    if(configuracion.mac!=null) $("#macObjeto").val(configuracion.mac);
    if(configuracion.boca!=null) $("#bocaObjeto").val(configuracion.boca);
    if(configuracion.armario!=null) $("#armarioObjeto").val(configuracion.armario);
    if(configuracion.usuario!=null) $("#usuarioObjeto").val(configuracion.usuario);
    if(configuracion.contrasena!=null) $("#contrasenaObjeto").val(configuracion.contrasena);
    
    $("#crearConfiguracion span").text("Modificar configuración");
    $("#crearConfiguracion").modal("show");
}

async function crearConfiguracion(){
    if($('#macObjeto').val()==""&&$('#bocaObjeto').val()==""&&$('#armarioObjeto').val()==""&&$('#usuarioObjeto').val()==""&&$('#contrasenaObjeto').val()==""&&$('#ipObjeto').val()=="") return;
    await realizarConsulta("apis/creacion/crearConfiguracion.php",{ip: $("#ipObjeto").val(), mac: $("#macObjeto").val(), boca:$("#bocaObjeto").val(), armario:$("#armarioObjeto").val(), usuario:$("#usuarioObjeto").val(), contrasena:$("#contrasenaObjeto").val(), objeto:idObjeto});
    $("#crearConfiguracion").modal("hide");
    cargarPagina();
}

async function modificarConfiguracion(){
    if($('#macObjeto').val()==""&&$('#bocaObjeto').val()==""&&$('#armarioObjeto').val()==""&&$('#usuarioObjeto').val()==""&&$('#ipObjeto').val()=="") return;
    await realizarConsulta("apis/modificacion/modificarConfiguracion.php",{ip: $("#ipObjeto").val(), mac: $("#macObjeto").val(), boca:$("#bocaObjeto").val(), armario:$("#armarioObjeto").val(), usuario:$("#usuarioObjeto").val(), contrasena:$("#contrasenaObjeto").val(), objeto:idObjeto, idConfiguracion:idConfiguracion});
    $("#crearConfiguracion").modal("hide");
    cargarPagina();
}

async function eliminarConfiguracion(idConfiguracion){
    await realizarConsulta("apis/eliminacion/eliminarConfiguracion.php",{idConfiguracion: idConfiguracion});
    $("#crearConfiguracion").modal("hide");
    cargarPagina();
}

</script>