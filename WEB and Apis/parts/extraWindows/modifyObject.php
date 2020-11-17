<!-- The modalGroupObject -->

<div id="ventanaFlotante" class="modal">
  <!-- Modal content -->
  <div class="modal-content">
    <h5>Modificar grupo de objetos</h5>
        <div class="form-group">
            <label for="formGroupExampleInput">Código</label>
            <input type="text" class="form-control" id="codigoO" placeholder="Código">
        </div>
        <div class="form-group">
            <label for="formGroupExampleInput">Ubicación</label>
            <input id="botonValor" type="text" class="form-control" disabled name="ubicacion" placeholder="Ubicación">
        </div>

        <div class="btn-group">
            <button id="botonEscrito" type="button" class="btn btn-secondary">Seleccionar nueva ubicación</button>
        </div>
            <?php include "selectUbication.php";?>
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