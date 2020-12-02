<!-- The modalGroupObject -->

<div id="ventanaFlotante" class="modal">
  <!-- Modal content -->
  <div class="modal-content">
    <h5>Modificar objeto</h5>
        <div class="form-group">
            <label>Código</label>
            <input type="text" class="form-control" id="codigoO" placeholder="Código">
        </div>
        <div class="form-group">
            <label>Mejoras del equipo</label>
            <input type="text" class="form-control" id="mejorasDelEquipo" placeholder="Mejoras del equipo">
        </div>
        <div class="col-md-12 mb-3"> 
            <label>Etiqueta</label>
            <input type="text" id="etiqueta" name="etiqueta" placeholder="Etiqueta del equipo" class="form-control">
-       </div>
    <div class="col-md-12 mb-3"> 
        <select class="form-control" id="organizativa">
        <option value=0>Departamento de informática</option>
        <option value=1>Ingeniería de sistemas y automática</option>
        <option value=2>Lenguaje y sistemas informáticos</option>
        <option value=3>Ciencias de la computación e inteligencia artificial</option>
        <option value=4>Arquitectura y tecnología de computadores</option>
    </select>
    </div>
    <div class="col-md-12 mb-3"> 
    <label>Observaciones</label>
    <input type="text" id="observaciones" name="observaciones" placeholder="Observaciones del equipo" class="form-control">
    </div>


        <button id="botonEscrito" type="button" class="btn btn-block btn-secondary" onclick="cargarEdificios(); $('#myModal').modal('show');" placeholder="Ubicación"required>Seleccionar ubicación</button>
        <input id="botonValor" type="hidden" name="ubicacion" required>
        <?php include "extraWindows/selectUbication.php";?>
        <button type="button" class="btn btn-secondary" style="visibility:hidden">happy</button><button type="button" class="btn btn-secondary" style="visibility:hidden">happy</button>
    <div class="btn-group">
        <button type="button" id="eliminarGO" class="btn btn-primary">Eliminar</button>
        <button type="button" class="btn btn-secondary" style="visibility:hidden"></button>
        <button type="button" id="modificarGO" class="btn btn-primary">Modificar</button>
    </div>

  
  </div>
</div>

<script>

$("#modificarGrupoDeObjetos").click(function(){showModal()});

function showModal(dato){
    $("#nombreGO").val("");
    $("#marcaGO").val("");
    $("#modeloGO").val("");
    $("#modificarGO").attr("onclick","actualizarDatos("+dato+");"); 
    $("#ventanaFlotante").modal("show");
    $("#eliminarGO").attr("onclick","eliminarDatos("+dato+");"); 
}


</script>