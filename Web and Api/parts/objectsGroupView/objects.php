<?php include "searchBarGroupObjects.php"; ?>
<div id="insideContainer" class="row justify-content-center"></div>
<script src="parts/objectsGroupView/objects.js"></script>

<script>
  async function actualizarDatos(id) {
        var form_data = new FormData(document.getElementById("formularioModificarGrupoObjetos"));
        form_data.append("idGrupoObjetos", id);

        await $.ajax({
            url: "apis/modificacion/modificarGrupoDeObjetos.php",
            type: 'POST',
            data: form_data,
            cache: false,
            processData: false, // tell jQuery not to process the data
            contentType: false,
            success: function(resp) {
                console.log(resp);
            }
        });
    await quitarModal($("#ventanaFlotante"));
    await cargarPagina();
  }
  async function eliminarDatos(id) {
    $("#ventanaFlotante").modal("hide");
    await realizarConsulta("apis/eliminacion/eliminarGrupoDeObjetos.php", {
      idGrupoObjetos: id
    });
    await cargarPagina();
  }
</script>