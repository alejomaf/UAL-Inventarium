<!-- The modalGroupObject -->
<div id="ventanaFlotante" class="modal">
  <!-- Modal content -->
  <div class="modal-content">
    <h5>Busca el objeto o añade uno nuevo</h5>
    <input id="grupoDeObjetos" type="text" placeholder="Escribe tu búsqueda o el nombre del nuevo objeto">
    <div class="alert alert-secondary" id="alertaCreacion" role="alert">
      Escribe el nombre del objeto antes de crearlo
    </div>
    <li class="list-group-item list-group-item-action list-group-item-primary" onclick="if(grupoDeObjetos.value==''){ $('.alertaCreacion').alert(); return;} crearSeleccionarObjeto(-1); modalGroupObject.style.display = 'none';">Crea un nuevo objeto</li>
    <ul id="botonesGroupObject" class="list-group">
</ul>
  </div>

</div>

<script>

$(document).on("click", "#ventanaFlotante", function() {
    modalGroupObject.style.display = "none";
    modal.style.display = "none";
});

</script>