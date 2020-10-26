<!-- The modalGroupObject -->

<div id="ventanaFlotante" class="modal">
  <!-- Modal content -->
  <div class="modal-content">
    <h5>Modificar grupo de objetos</h5>
        <form>
            <div class="form-group">
                <label for="formGroupExampleInput">Nombre</label>
                <input type="text" class="form-control" id="nombreGO" placeholder="Nombre">
            </div>
            <div class="form-group">
                <label for="formGroupExampleInput2">Marca</label>
                <input type="text" class="form-control" id="marcaGO" placeholder="Marca">
            </div>
            <div class="form-group">
                <label for="formGroupExampleInput2">Modelo</label>
                <input type="text" class="form-control" id="modeloGO" placeholder="Modelo">
            </div>
        </form>
    <div class="btn-group">
        <button type="button" id="eliminarGO" class="btn btn-primary">Eliminar</button>
        <button type="button" class="btn btn-primary" style="visibility:hidden"></button>
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