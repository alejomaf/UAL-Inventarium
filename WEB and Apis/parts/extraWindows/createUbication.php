<!-- The modalGroupObject -->

<div id="ubicacionFlotante" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <ul id="listaEdificios">

    </ul>
    <div class="btn-group">
        <button type="button" id="eliminarGO" class="btn btn-primary">Crear edificio</button>
    </div>

  
  </div>
</div>

<script>

$("#crearUbicacion").click(function(){showModal()});

function showModal(dato){
    $("#ubicacionFlotante").modal("show");
}


</script>